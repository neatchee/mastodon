// @preval
// http://www.unicode.org/Public/emoji/5.0/emoji-test.txt
// This file contains the compressed version of the emoji data from
// both emoji_map.json and from emoji-mart's emojiIndex and data objects.
// It's designed to be emitted in an array format to take up less space
// over the wire.

// This version comment should be bumped each time the emoji data is changed
// to ensure that the prevaled file is regenerated by Babel
// version: 4

import { NimbleEmojiIndex } from 'emoji-mart';
import { uncompress as emojiMartUncompress } from 'emoji-mart/dist/utils/data';

import data from './emoji_data.json';
import emojiMap from './emoji_map.json';
import { unicodeToFilename } from './unicode_to_filename';
import { unicodeToUnifiedName } from './unicode_to_unified_name';

emojiMartUncompress(data);

const emojiMartData = data;
const emojiIndex = new NimbleEmojiIndex(emojiMartData);

const excluded = ['®', '©', '™'];
const skinTones = ['🏻', '🏼', '🏽', '🏾', '🏿'];
const shortcodeMap = {};

const shortCodesToEmojiData = {};
const emojisWithoutShortCodes = [];

Object.keys(emojiIndex.emojis).forEach((key) => {
  let emoji = emojiIndex.emojis[key];

  // Emojis with skin tone modifiers are stored like this
  if (Object.hasOwn(emoji, '1')) {
    emoji = emoji['1'];
  }

  shortcodeMap[emoji.native] = emoji.id;
});

const stripModifiers = (unicode) => {
  skinTones.forEach((tone) => {
    unicode = unicode.replace(tone, '');
  });

  return unicode;
};

Object.keys(emojiMap).forEach((key) => {
  if (excluded.includes(key)) {
    delete emojiMap[key];
    return;
  }

  const normalizedKey = stripModifiers(key);
  let shortcode = shortcodeMap[normalizedKey];

  if (!shortcode) {
    shortcode = shortcodeMap[normalizedKey + '\uFE0F'];
  }

  const filename = emojiMap[key];

  const filenameData = [key];

  if (unicodeToFilename(key) !== filename) {
    // filename can't be derived using unicodeToFilename
    filenameData.push(filename);
  }

  if (typeof shortcode === 'undefined') {
    emojisWithoutShortCodes.push(filenameData);
  } else {
    if (!Array.isArray(shortCodesToEmojiData[shortcode])) {
      shortCodesToEmojiData[shortcode] = [[]];
    }

    shortCodesToEmojiData[shortcode][0].push(filenameData);
  }
});

Object.keys(emojiIndex.emojis).forEach((key) => {
  let emoji = emojiIndex.emojis[key];

  // Emojis with skin tone modifiers are stored like this
  if (Object.hasOwn(emoji, '1')) {
    emoji = emoji['1'];
  }

  // Emojis with skin tone modifiers are stored like this
  if (Object.hasOwn(emoji, '1')) {
    emoji = emoji['1'];
  }

  const { native } = emoji;
  let { short_names, search, unified } = emojiMartData.emojis[key];

  if (short_names[0] !== key) {
    throw new Error(
      'The compressor expects the first short_code to be the ' +
        'key. It may need to be rewritten if the emoji change such that this ' +
        'is no longer the case.',
    );
  }

  short_names = short_names.slice(1); // first short name can be inferred from the key

  const searchData = [native, short_names, search];

  if (unicodeToUnifiedName(native) !== unified) {
    // unified name can't be derived from unicodeToUnifiedName
    searchData.push(unified);
  }

  if (!Array.isArray(shortCodesToEmojiData[key])) {
    shortCodesToEmojiData[key] = [[]];
  }

  shortCodesToEmojiData[key].push(searchData);
});

// JSON.parse/stringify is to emulate what @preval is doing and avoid any
// inconsistent behavior in dev mode
export default JSON.parse(
  JSON.stringify([
    shortCodesToEmojiData,
    /*
     * The property `skins` is not found in the current context.
     * This could potentially lead to issues when interacting with modules or data structures
     * that expect the presence of `skins` property.
     * Currently, no definitions or references to `skins` property can be found in:
     * - {@link node_modules/emoji-mart/dist/utils/data.js}
     * - {@link node_modules/emoji-mart/data/all.json}
     * - {@link app/javascript/mastodon/features/emoji/emoji_compressed.d.ts#Skins}
     * Future refactorings or updates should consider adding definitions or handling for `skins` property.
     */
    emojiMartData.skins,
    emojiMartData.categories,
    emojiMartData.aliases,
    emojisWithoutShortCodes,
  ]),
);
