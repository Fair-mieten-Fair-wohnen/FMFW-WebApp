import {Time} from "@angular/common";
import {Supporter} from "./supporter";
import {Causer} from "./causer";
import {Address} from "./address";
import {InvolvedPerson} from "./involved-person";
import {Evidence} from "./evidence";
import {Intervention} from "./intervention";
import {CauserType} from "./causer-type";
import {IDTypeDictionary} from "angular-tree-component/dist/defs/api";
import {PathResolver} from "./path-resolver";

export class Item extends PathResolver {
    public type: string;
    public state?: string;
    public id?: number;
    public metadata?: {
      incident_number?: string,
      creation_date?: string,
      lastupdated_date?: string,
      lastupdated_user?: string,
      institution?: string,
      external_incident?: boolean,
      responsible_institution?: string,
      responsible_institution_others?: string,
      consultant?: string,
    };
    public generaldata?: {
      advise_language?: string,
      advise_language_others?: string,
      contact_by?: string,
      first_contact_date?: string,
      anonymous?: boolean,
      consent_granted?: boolean,
      type_of_advise?: string,
      become_aware_of?: string,
      become_aware_of_others?: string,
      general_comment?: string
    };
    public affected_person?: {
      lastname?: string,
      firstname?: string,
      address?: Address,
      email?: string,
      phone?: string,
      affected_group?: string,
      affected_group_others?: string,
      number_of_children?: string,
      gender?: string,
      age?: string,
      funding_letigation_costs?: string,
      funding_letigation_costs_others?: string
    };
    public supporter_list?: Supporter[];
    public causer_list?: Causer[];
    public short_description?: {
      incident_date?: string,
      incident_timerange_end?: string,
      incident_time?: Time,
      generated_dates?:
        {
          complaint_until_date?: string,
          legal_action_until_date?: string,
          criminal_application_until_date?: string
        }
      incident_place?: {
          incident_district?: string,
          incident_district_others?: string,
          incident_zipcode?: number,
      }
      incident_short_description?: string

    };
    public involved_list?: InvolvedPerson[];
    public evidence_list?: Evidence[];
    public incident_typology?: {
      general?: {
        area_of_discrimination?: string,
        area_of_discrimination_others?: string,
        form_of_discrimination?: string[],
        form_of_discrimination_others?: string
      },
      grounds_of_discrimination?: {
        selected_grounds?: IDTypeDictionary,
        other_grounds?: any
      },
      causer_typology?: CauserType[]
    };
    public process_blog_part1?: {
      goal_person_concerned?: string[],
      goal_person_concerned_others?: string,
      areas_of_law?: string[],
      areas_of_law_others?: string,
      approach?: string
    };
    public interventions?: Intervention[];
    public completion?: {
      result?: string,
      result_others?: string,
      result_description?: string
    };

  constructor(values: any) {
    super();
    this.type = values.type;
    this.state = values.state;
    this.id = values.id;
    if (values.metadata) {
      if (!this.metadata) this.metadata = {};
      this.metadata.incident_number = values.metadata.incident_number;
      this.metadata.creation_date = values.metadata.creation_date;
      this.metadata.lastupdated_date = values.metadata.lastupdated_date;
      this.metadata.lastupdated_user = values.metadata.lastupdated_user;
      this.metadata.institution = values.metadata.institution;
      this.metadata.consultant = values.metadata.consultant;

      this.metadata.external_incident = values.metadata.external_incident !== undefined ?
        values.metadata.external_incident : false;
      this.metadata.responsible_institution = values.metadata.responsible_institution;
      this.metadata.responsible_institution_others = values.metadata.responsible_institution_others;
    }
    if (values.generaldata) {
      if (!this.generaldata) this.generaldata = {};
      this.generaldata.become_aware_of = values.generaldata.become_aware_of;
      this.generaldata.become_aware_of_others = values.generaldata.become_aware_of_others;
      this.generaldata.advise_language = values.generaldata.advise_language;
      this.generaldata.advise_language_others = values.generaldata.advise_language_others;
      this.generaldata.contact_by = values.generaldata.contact_by;
      this.generaldata.first_contact_date = values.generaldata.first_contact_date;
      this.generaldata.anonymous = values.generaldata.anonymous;
      this.generaldata.consent_granted = values.generaldata.consent_granted;
      this.generaldata.type_of_advise = values.generaldata.type_of_advise;
      this.generaldata.general_comment = values.generaldata.general_comment;
    }
    if (values.affected_person) {
      if (!this.affected_person) this.affected_person = {};
      this.affected_person.lastname = values.affected_person.lastname;
      this.affected_person.firstname = values.affected_person.firstname;
      this.affected_person.address = values.affected_person.address ? new Address(values.affected_person.address) : undefined;

      this.affected_person.email = values.affected_person.email;
      this.affected_person.phone = values.affected_person.phone;
      this.affected_person.affected_group = values.affected_person.affected_group;
      this.affected_person.affected_group_others = values.affected_person.affected_group_others;
      this.affected_person.number_of_children = values.affected_person.number_of_children;
      this.affected_person.gender = values.affected_person.gender;
      this.affected_person.age = values.affected_person.age;
      this.affected_person.funding_letigation_costs = values.affected_person.funding_letigation_costs;
      this.affected_person.funding_letigation_costs_others = values.affected_person.funding_letigation_costs_others;
    }
    if (values.supporter_list) {
      if (!this.supporter_list) this.supporter_list = [];
      values.supporter_list.forEach(supporter => this.supporter_list.push(new Supporter(supporter)));
    }
    if (values.causer_list) {
      if (!this.causer_list) this.causer_list = [];
      values.causer_list.forEach(causer => this.causer_list.push(new Causer(causer)));
    }
    if (values.short_description) {
      if (!this.short_description) this.short_description = {};
      this.short_description.incident_date = values.short_description.incident_date;
      this.short_description.incident_timerange_end = values.short_description.incident_timerange_end;
      this.short_description.incident_time = values.short_description.incident_time;
      if (values.short_description.generated_dates) {
        if (!this.short_description.generated_dates) this.short_description.generated_dates = {};
        this.short_description.generated_dates.complaint_until_date = values.short_description.generated_dates.complaint_until_date;
        this.short_description.generated_dates.legal_action_until_date = values.short_description.generated_dates.legal_action_until_date;
        this.short_description.generated_dates.criminal_application_until_date = values.short_description.generated_dates.criminal_application_until_date;

      }
      if (values.short_description.incident_place) {
        if (!this.short_description.incident_place) this.short_description.incident_place = {};
        this.short_description.incident_place.incident_district = values.short_description.incident_place.incident_district;
        this.short_description.incident_place.incident_district_others = values.short_description.incident_place.incident_district_others;
        this.short_description.incident_place.incident_zipcode = values.short_description.incident_place.incident_zipcode;

      }
      this.short_description.incident_short_description = values.short_description.incident_short_description;
    }
    if (values.involved_list) {
      if (!this.involved_list) this.involved_list = [];
      values.involved_list.forEach(involved => this.involved_list.push(new InvolvedPerson(involved)));
    }
    if (values.evidence_list) {
      if (!this.evidence_list) this.evidence_list = [];
      values.evidence_list.forEach(evidence => this.evidence_list.push(new Evidence(evidence)));
    }
    if (values.incident_typology) {
      if (!this.incident_typology) this.incident_typology = {};
      if (values.incident_typology.general) {
        if (!this.incident_typology.general) this.incident_typology.general = {};
        this.incident_typology.general.area_of_discrimination = values.incident_typology.general.area_of_discrimination;
        this.incident_typology.general.area_of_discrimination_others = values.incident_typology.general.area_of_discrimination_others;
        this.incident_typology.general.form_of_discrimination = values.incident_typology.general.form_of_discrimination;
        this.incident_typology.general.form_of_discrimination_others = values.incident_typology.general.form_of_discrimination_others;
      }
      if (values.incident_typology.grounds_of_discrimination) {
        if (!this.incident_typology.grounds_of_discrimination) this.incident_typology.grounds_of_discrimination = {};
        this.incident_typology.grounds_of_discrimination.selected_grounds = values.incident_typology.grounds_of_discrimination.selected_grounds;
        this.incident_typology.grounds_of_discrimination.other_grounds = values.incident_typology.grounds_of_discrimination.other_grounds;
      }
      if (values.incident_typology.causer_typology) {
        if (!this.incident_typology.causer_typology)  this.incident_typology.causer_typology = [];
        values.incident_typology.causer_typology.forEach(causer_type => this.incident_typology.causer_typology.push(new CauserType(causer_type)));
      }
    }
    if (values.process_blog_part1) {
      if (!this.process_blog_part1) this.process_blog_part1 = {};
      this.process_blog_part1.goal_person_concerned = values.process_blog_part1.goal_person_concerned;
      this.process_blog_part1.goal_person_concerned_others = values.process_blog_part1.goal_person_concerned_others;
      this.process_blog_part1.areas_of_law = values.process_blog_part1.areas_of_law;
      this.process_blog_part1.areas_of_law_others = values.process_blog_part1.areas_of_law_others;
      this.process_blog_part1.approach = values.process_blog_part1.approach;
    }
    if (values.interventions) {
      if (!this.interventions) this.interventions = [];
      values.interventions.forEach(intervention => this.interventions.push(new Intervention(intervention)));
    }
    if (values.completion) {
      if (!this.completion) this.completion = {};
      this.completion.result = values.completion.result;
      this.completion.result_others = values.completion.result_others;
      this.completion.result_description = values.completion.result_description;
    }
  }

  public listValueToString(paramPath: string[], valueMap: Map<string,any>, otherKey?: string, otherValuePath?: string[]): string {
    let val = '';
    // check if param is set
    const param = this.resolveParamPath(paramPath);
    if (param) {
      if (valueMap[param]) val = valueMap[param].label;
      // check if otherKey is set
      if (otherKey && (param as string).includes(otherKey)){
        const otherString = this.resolveParamPath(otherValuePath);
        val += ": ";
        val += (otherString ? otherString : "-");
      }
    }

    return val;
  }

}
