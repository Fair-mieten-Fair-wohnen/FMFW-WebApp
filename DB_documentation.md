# FMFW Dokumentatiosnsystem - Documantation for DataBase Endpoints

## API Basepath:
`adwDocumentationSystem/api/v1`

## incident CRUD

Create, read, update and delete incidents

### Basepath for incident subarea:
`/incident`

### incident structure

ATTENTION: structure is work-in-progress!

The only required parameter of an item is the type:

    {
      id: 'string' // UUID of incident
      type: 'string',        // id of an incident type from request body object
      metadata: {
          incident_number: 'string',      // unique ascending number of the incident
          creation_date: 'date-time-string',  // timestamp when incident was created on server
          consultant: {
            id: 'string',    // UUID of user
            firstname: 'string',
            lastname: 'string'
          },
          institution: {
                id: 'string',   // UUID of institution
                name: 'string'
           }
      },
    generaldata: {
      contact_by: 'string',
      first_contact_date: string,
      anonymous: boolean,
      consent_granted: boolean,
      type_of_advise: string,
      general_comment: string
    },
    affected_person: {
      lastname: 'string',
      firstname: 'string',
      address: {
        street: 'string',
        number: 'string',
        zipcode: 'string',
        city: 'string'        
      },
      affected_group?: string,
      affected_group_others?: string,
      number_of_children?: string,
      email: boolean,
      phone: boolean,
      gender: boolean,
      gender_others: 'string',
      age: boolean,
      ethnic_origin: 'string', // depricated
      funding_letigation_costs: boolean,
      funding_letigation_costs_others: 'string'
    },
    supporter_list: [
      {
        support_format: 'string',
        support_format_others: 'string',
        institution_name: 'string',
        supporter_name: 'string',
        email: 'string',
        phone: 'string'
      }
    ],
    causer_list: [
      {
          name: 'string',
          address: {
            street: 'string',
            number: 'string',
            zipcode: 'string',
            city: 'string'        
          },
        email: 'string',
        phone: 'string'
          institution_name: 'string'
      }
    ],
    short_description: {
      incident_date: Date,
      incident_time: Time,
      generated_dates:
        {
          complaint_until_date: Date,
          legal_action_until_date: Date,
          criminal_application_until_date: Date
        }
      incident_place: {
          incident_district: 'string',
          incident_district_others: 'string',
          incident_zipcode: number,
      }
      incident_short_description: 'string'
    },
    witness_list: [
      {
        name: 'string',
        address: {
            street: 'string',
            number: 'string',
            zipcode: 'string',
            city: 'string'        
        },
        email: 'string',
        phone: 'string'
        comment: 'string'        
      }  
    ],
    evidence_list: [
      {
        number: number,
        description: 'string',
        document_place: 'string'
      }
    ],
    typology_incident: {
        grounds_of_discrimination: [
            groundId: 'string' // id of the selected ground from value list grounds_of_discrimination
        ],
        area_of_discrimination: "id of selected item from value list area_of_discrimination",
        area_of_discrimination_others: 'string' // only if selected area of discrimination is OTHERS
        form_of_discrimination: [
            "id of selected item from value list form_of_discrimination"
        ],
        form_of_discrimination_others: 'string' // only if area of discrimination array contains OTHERS
    },
    typology_causer: {
    // TODO: clarify structure
    }    
    goals_and_solution_approach: {
        goal_person_concerned: [
            goalId: 'string' // id of the selected goal from value list goal_person_concerned
        ],
        goal_person_concerned_others: 'string', // only if selected goals array contains OTHERS
        areas_of_law: [
            areas_of_lawId: 'string' // id of the selected areas_of_law from value list areas_of_law
        ]
        areas_of_law_others: 'string', // only if selected areas_of_law array contains OTHERS
        solution_approach: 'string', // text field to insert free text
    }
    interventions_log: [
      date: 'date-time-string',  // timestamp when incident was created on server
      set_deadline_date: 'date-time-string',  // timestamp when incident was created on server
      form_intervention: [
        form_interventionId: 'string' // id of the selected form of intervention from value list form_intervention            
      ],
      form_intervention_others: 'string', // only if selected form_intervention array contains OTHERS          
      comment: 'string'
    ],
    completion {
        outcome [
            outcomeId: 'string' // id of the selected result from value list outcome
        ],
        outcome_others: 'string', // only if selected outcome array contains OTHERS
        comment: '' // text field to insert free text about the completion/outcome/result
    }

}

### create incident

create a new incident of a given type, given as id of a valid value from list VORGANGSTYP:

    POST /incident
    
    {   'type': 'MELDUNG' }

Returns the new created incident completed with:

* generated UUID
* creation date,
* incident_name created by a given rule (configurable, intially the incidents shall have unique ascending numbers)
* and paramters from the user info of the logged in user as the consultant of this new incident:
   * userId
   * userName
   * institution


    {
      'id': '46884d69-491c-4eab-b7a0-bb86aea6385d' // UUID of incident
      'type': 'MELDUNG',        // id of an incident type from request body object
      'metadata': {
          'incident_number': '14',      // unique ascending number of the incident
          'creation_date': 'date-time-string',  // timestamp when incident was created on server
          'consultant': {
            'id': '6025c6c6-e994-4930-8b27-25b83f551680',    // UUID of user
            'firstname': 'Max',
            'lastname': 'Mustermensch'
          },
          'institution': {
                'id': '414c610c-6177-4796-ae64-52b37d36476b',   // UUID of institution
                'name': 'Institution name'
           }
      }
    }

### read incident

fetches an existing incident found by given id:

    GET /incident/:id

Returns the found incident or returns an http-500 with error:

    {
        error-id: "INCIDENT_NOT_FOUND",
        error-message: "cannot find incident with given id"
    }

### update incident

updates an existing incident with the new given data:

    PUT /incident/:id
    
    body: incident in given data structure

Returns "ok" with http-200 if successful OR incident, if something has been changed

### delete incident

deletes an incident found by given id if:
 * exists
 * and logged in user is owner of the incident (has created it)
 
    
    DELETE /incident/:id

Returns the deleted incident.

## incident list

Incident list relevant endpoints

### Basepath for incident list subarea:
`/incidents`

### query column names of incident list

    GET /column-names

Returns an array of column names in the following structure:

#### general structure of an incident column name:

    { 
        id: 'string',    // UUID - if needed?
        label: 'string'     // the label to be shown in the header row of the list
        ref: 'string',  // key from incidents stub list item to show in this column
        type: 'string', // type of the content: string, number, date, date-time, incident-type
        weight: number  // defines the order of the rows
    }

Example:

    [
        {
            id: '7b9c310b-0054-45b5-958e-27fcf591e804',
            label: 'Fallnummer',
            ref: 'incident_number',
            type: 'string',
            weight: 10
        },
        {
            id: 'b017b3f5-3c83-4d19-930f-2bbe48373304',
            label: 'Datum der Meldung',
            ref: 'creation_date',
            type: 'date',
            weight: 20
        },
        ...
        {
            id: 'ddeec80b-2356-4bbc-9864-70e23bf7f2c9',
            label: 'Vorgang',
            ref: 'type',
            type: 'type',
            weight: 50
        }
    ]


### query all incident stubs

fetch all incidents as stubs

    GET /

Returns an array of incident stubs in a flat structure, containing only the for the item list relevant data of an incident 

#### general structure of an incident stub:

    {
        id: 'string', // UUID of the incident; will be read on click in list row
        type: 'string',        // id of an incident type from request body object
        incident_number: 'string',      // unique ascending number of the incident
        creation_date: 'date-time-string',  // timestamp when incident was created on server
        institution_name: 'string',     // metadata.institution.name
        consultant: 'string'           // metadata.consultant.firstname + " " + metadata.consultant.lastname
     }

### query a page of the incident list

fetch only the defined amount of incidents.
The amount and page is given in the url:

    GET /incidents/:amount/:page
    
    amount: the maximum number of returned incidents, > 0, < 100
    page: which page of the paginated incidents is requested? Starts with page 1
    
Example:

    /incidents/10/3
    
    tries to fetch incident 21 - 30

Returns an array of incident stubs with 0 up to <amount> incident stubs

### query a list page of ordered incident

query a page of the incident list ordered by a given parameter and given direction

fetch only the defined amount of incidents. 
The amount and page is given in the url.
The incidents are ordered by the given parameter in the given direction before cutting into slices:

    GET /incidents/:amount/:page/:orderby/:asc
    
    amount: the maximum number of returned incidents, > 0, < 100
    page: which page of the paginated incidents is requested? Starts with page 1
    orderby: the name of the row to order by
    asc: boolean, TRUE -> ascending, FALSE -> descanding
    
Example:

    /incidents/10/1/creation_date/false
    
    tries to fetch the newest 10 incidents


Returns an array of incident stubs with 0 up to <amount> incident stubs



## Value Lists

Fetch lists of valid values for select lists.
The list may have only one level or more complex (collapsable) structures.

### Basepath for valuelists subarea:
`/valuelists`

### General structure

All value lists have a structure like:

```{.json}
    [
      {
        id: 12345,
        cat: "rasDisk",
        key: "RASSDISK",
        label : "Rassistische Diskriminierung",
        weight: 100
        list: [ 
          {
            id: 83473,
            key: "POC",
            label: "Person of Color",
            inCat: "rasDisk",
            weight: 100
          },
          {
            id: 83478,
            key: "SPEACH",
            label: "Sprache",
            inCat: "rasDisk",
            weight: 90
          }]
        ]
      }
    ]
```

    CALL:  adwDocumentationSystem/api/v1/valuelists/DISKRIMERKMALE

    RESPONSE: ARRAY of values in the following OptionValue structure:
    {        
        id: number,
        cat: string, OPTION
        key: string,
        label : string,
        weight: number, OPTION
        list: ARRAY of values in the same structure, OPTION
    }

### List of simple Value Lists

The following requests return an array of incident types in the OptionValue structure without sublists:

    GET /incident_type
    GET /contact_by
    GET /gender
    GET /age
    GET /ethnic_origin
    GET /funding_letigation_costs
    GET /support_format
    GET /district
    GET /area_of_discrimination
    GET /form_of_discrimination
    GET /goal_person_concerned
    GET /areas_of_law
    GET /form_intervention
    GET /outcome
    GET /causer
    GET /owner_agency
    GET /number_of_appartments 
       
    
### List of Value Lists with sub lists

The following requests return an array of incident types in the OptionValue structure with sublists:

    GET /grounds_of_discrimination


### Vorgangstyp as MAP

Requests all incident types as a map:

    GET /map/<value-list>

Example:

    GET /map/incident_type

Returns a map of all incident types:

    {
      'ALLG_BERATUNG': { id: 1, key: 'ALLG_BERATUNG', label: 'allgemeine Beratung'},
      'MELDUNG': { id: 2, key: 'MELDUNG', label: 'Meldung'},
      'FALLBETREUUNG': { id: 3, key: 'FALLBETREUUNG', label: 'Fallbetreuung'}
    }
