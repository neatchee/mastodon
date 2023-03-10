/*eslint eqeqeq: "off"*/
/*eslint no-nested-ternary: "off"*/

export default [
    {
      locale: "es",
      pluralRuleFunction: function(e, a) {
        var n = String(e).split("."),
          l = !n[1],
          o = Number(n[0]) == e,
          t = o && n[0].slice(-1),
          r = o && n[0].slice(-2);
        return a ? 1 == t && 11 != r ? "one" : 2 == t && 12 != r ? "two" : 3 == t && 13 != r ? "few" : "other" : 1 == e && l ? "one" : "other"
      },
      fields: {
        year: {
          displayName: "año",
          relative: {
            0: "este año",
            1: "el próximo año",
            "-1": "el año pasado"
          },
          relativeTime: {
            future: {
              one: "en {0} año",
              other: "en {0} años"
            },
            past: {
              one: "hace {0} año",
              other: "hace {0} años"
            }
          }
        },
        month: {
          displayName: "mes",
          relative: {
            0: "este mes",
            1: "el próximo mes",
            "-1": "el mes pasado"
          },
          relativeTime: {
            future: {
              one: "en {0} mes",
              other: "en {0} meses"
            },
            past: {
              one: "hace {0} mes",
              other: "hace {0} meses"
            }
          }
        },
        day: {
          displayName: "dia",
          relative: {
            0: "hoy",
            1: "mañana",
            "-1": "hayer"
          },
          relativeTime: {
            future: {
              one: "en {0} dia",
              other: "en {0} dias"
            },
            past: {
              one: "hace {0} dia",
              other: "hace {0} dias"
            }
          }
        },
        hour: {
          displayName: "hora",
          relativeTime: {
            future: {
              one: "en {0} hora",
              other: "en {0} horas"
            },
            past: {
              one: "hace {0} hora",
              other: "hace {0} horas"
            }
          }
        },
        minute: {
          displayName: "minuto",
          relativeTime: {
            future: {
              one: "en {0} minuto",
              other: "en {0} minutos"
            },
            past: {
              one: "hace {0} minuto",
              other: "hace {0} minutos"
            }
          }
        },
        second: {
          displayName: "segundo",
          relative: {
            0: "ahora"
          },
          relativeTime: {
            future: {
              one: "en {0} segundo",
              other: "en {0} segundos"
            },
            past: {
              one: "hace {0} segundo",
              other: "hace {0} segundos"
            }
          }
        }
      }
    }
  ]