export const Config = {
  "LIST_ITEMS_PER_PAGE": 10,
  "MAX_NUM_OF_PAGE_NUMS_LISTED": 20,
  "DATE_FORMAT": "dd.MM.yyyy",
  "DATE_TIME_FORMAT": "dd.MM.yyyy, HH:mm",
  "TIME_FORMAT": "HH:mm 'Uhr'",
  "DEBUG_LEVEL_THRESHHOLD": 10,
  "OTHER_SELECTION_KEY": "other",
  "OTHER_SELECTION_LABEL": "anderes",
  "NOT_SET_PLACEHOLDER": "-",
  "LAWSUIT_DEADLINES": {
    "COMPLAINT_RANGE": {"months": 2},
    "LEGAL_ACTION_RANGE": {"years": 3},
    "CRIMINAL_APPLICATION_RANGE": {"months": 3}
  },
  "REQUIRED_ROLES": {
    "aggregation": "aggregation-access"
  },
  "CHART_COLORS": [
   "rgb(51, 102, 153)",
   "rgb(221, 110, 66)",
   "rgb(86, 85, 84)",
   "rgb(232, 197, 71)",
   "rgb(149, 198, 35)",
   "rgb(45, 49, 66)",
   "rgb(117, 70, 104)",
   "rgb(77, 170, 87)",
   "rgb(191, 192, 192)",
   "rgb(239, 91, 91)",
  ],
  "AREAS": [
    "INCIDENTS",
    "AGGREGATION"
  ],
  "INCIDENTS": {
    "ALL_TABS": {
      "TAB_LABELS": [
        {"ID": "vorgangstyp",
          "LABEL_ID": "NAV_TAB_LABEL_VORGANGSTYP",
          "LABEL_DEFAULT": "Vorgangstyp",
          "COMPONENT_NAME": "vorgangstyp"
        },
        {"ID": "allgemein",
          "LABEL_ID": "NAV_TAB_LABEL_ALLGEMEIN",
          "LABEL_DEFAULT": "Allgemeine Daten (Einverständniserklärung)",
          "COMPONENT_NAME": "allgemein"
        },
        {"ID": "person",
          "LABEL_ID": "NAV_TAB_LABEL_PERSON",
          "LABEL_DEFAULT": "Betroffene Person",
          "COMPONENT_NAME": "person"
        },
        {"ID": "unterstuetzung",
          "LABEL_ID": "NAV_TAB_LABEL_UNTERSTUETZUNG",
          "LABEL_DEFAULT": "Angaben zu Unterstützer*innen",
          "COMPONENT_NAME": "unterstuetzung"
        },
        {"ID": "typologie",
          "LABEL_ID": "NAV_TAB_LABEL_FALLTYPOPLOGIE",
          "LABEL_DEFAULT": "Falltypologie",
          "COMPONENT_NAME": "typologie"
        },
        {"ID": "verursachenden",
          "LABEL_ID": "NAV_TAB_LABEL_VERURSACHENDEN",
          "LABEL_DEFAULT": "Angaben zum*r Verursachenden",
          "COMPONENT_NAME": "verursachenden"
        },
        {"ID": "kurzbeschreibung",
          "LABEL_ID": "NAV_TAB_LABEL_KURZBESCHREIBUNG",
          "LABEL_DEFAULT": "Kurzbeschreibung des Vorfalls",
          "COMPONENT_NAME": "kurzbeschreibung"
        },
        {"ID": "zeuginnen",
          "LABEL_ID": "NAV_TAB_LABEL_ZEUGINNEN",
          "LABEL_DEFAULT": "Beteiligte und Zeug*innen",
          "COMPONENT_NAME": "zeuginnen"
        },
        {"ID": "beweise",
          "LABEL_ID": "NAV_TAB_LABEL_BEWEISE",
          "LABEL_DEFAULT": "Beweise",
          "COMPONENT_NAME": "beweise"
        },
        {"ID": "verlauf1",
          "LABEL_ID": "NAV_TAB_LABEL_VERLAUF1",
          "LABEL_DEFAULT": "Lösungsansatz",
          "COMPONENT_NAME": "verlauf1"
        },
        {"ID": "verlauf2",
          "LABEL_ID": "NAV_TAB_LABEL_VERLAUF2",
          "LABEL_DEFAULT": "Protokollierung des Verlaufes",
          "COMPONENT_NAME": "verlauf2"
        },
        {"ID": "result",
          "LABEL_ID": "NAV_TAB_LABEL_RESULT",
          "LABEL_DEFAULT": "Abschluss/Ergebnis",
          "COMPONENT_NAME": "result"
        },
        {"ID": "zusammenfassung",
          "LABEL_ID": "NAV_TAB_LABEL_ZUSAMMENFASSUNG",
          "LABEL_DEFAULT": "Zusammenfassung",
          "COMPONENT_NAME": "zusammenfassung"
        }
      ]
    },
    "ISSUE_TYPE": {
      "READONLY_ALLG_BERATUNG": {
        "ACTIVE_TABS": [
          "zusammenfassung"
        ]
      },
      "ALLG_BERATUNG": {
        "ACTIVE_TABS": [
          "vorgangstyp",
          "allgemein",
          "zusammenfassung"
        ]
      },
      "READONLY_MELDUNG": {
        "ACTIVE_TABS": [
          "zusammenfassung"
        ]
      },
      "MELDUNG": {
        "ACTIVE_TABS": [
          "vorgangstyp",
          "allgemein",
          "person",
          "unterstuetzung",
          "typologie",
          "verursachenden",
          "kurzbeschreibung",
          "zeuginnen",
          "beweise",
          "zusammenfassung"
        ]
      },
      "READONLY_FALLBETREUUNG": {
        "ACTIVE_TABS": [
          "zusammenfassung"
        ]
      },
      "FALLBETREUUNG": {
        "ACTIVE_TABS": [
          "vorgangstyp",
          "allgemein",
          "person",
          "unterstuetzung",
          "typologie",
          "verursachenden",
          "kurzbeschreibung",
          "zeuginnen",
          "beweise",
          "verlauf1",
          "verlauf2",
          "result",
          "zusammenfassung"
        ]
      },
      "NEU": {
        "ACTIVE_TABS": [
          "vorgangstyp"
        ]
      }
    }
  },

  "AGGREGATION": {
    "ALL_TABS": {
      "TAB_LABELS": [
        {"ID": "aggregation_single_chart",
          "LABEL_ID": "NAV_TAB_LABEL_AGGREGATION_SINGLE_CHART",
          "LABEL_DEFAULT": "Aggregation Einzelchart",
          "COMPONENT_NAME": "single-chart"
        },
        {"ID": "aggregation_print_all",
          "LABEL_ID": "NAV_TAB_LABEL_AGGREGATION_PRINT_ALL",
          "LABEL_DEFAULT": "Aggregation Druckansicht",
          "COMPONENT_NAME": "print-all"
        }
      ]
    },
    "ISSUE_TYPE": {
      "AGGREGATION": {
        "ACTIVE_TABS": [
          "aggregation_single_chart",
          "aggregation_print_all"
        ]
      }
    }
  }
};
