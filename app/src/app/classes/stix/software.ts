import {StixObject} from "./stix-object";

type type_software = "malware" | "tool"
export class Software extends StixObject {
    public name: string;
    public description: string;
    public aliases: string[];
    public platforms: string[];
    public type: string;
    public contributors: string[];

    constructor(type: type_software, sdo?: any) {
        super(sdo, type);
        if (sdo) {
            this.deserialize(sdo);
        }
    }

    /**
     * Transform the current object into a raw object for sending to the back-end, stripping any unnecessary fields
     * @abstract
     * @returns {*} the raw object to send
     */
    public serialize(): any {
        let rep: {[k: string]: any } = {};

        rep.stix = super.base_serialize();
        rep.stix.name = this.name;
        rep.stix.description = this.description;
        rep.stix.type = this.type;
        rep.stix.x_mitre_aliases = this.aliases;
        rep.stix.x_mitre_platforms = this.platforms;
        rep.stix.x_mitre_contributors = this.contributors;

        return JSON.stringify(rep);
    }

    /**
     * Parse the object from the record returned from the back-end
     * @abstract
     * @param {*} raw the raw object to parse
     */
    public deserialize(raw: any) {
        if ("stix" in raw) {
            let sdo = raw.stix;

            if ("name" in sdo) {
                if (typeof(sdo.name) === "string") this.name = sdo.name;
                else console.error("TypeError: name field is not a string:", sdo.name, "(",typeof(sdo.name),")")
            } else this.name = "";

            if ("description" in sdo) {
                if (typeof(sdo.description) === "string") this.description = sdo.description;
                else console.error("TypeError: description field is not a string:", sdo.description, "(",typeof(sdo.description),")")
            } else this.description = "";

            if ("type" in sdo) {
                if (typeof(sdo.type) === "string") this.type = sdo.type;
                else console.error("TypeError: type field is not a string:", sdo.type, "(",typeof(sdo.type),")")
            } else this.type = "";

            if ("x_mitre_aliases" in sdo) {
                if (this.isStringArray(sdo.x_mitre_aliases)) this.aliases = sdo.x_mitre_aliases;
                else console.error("TypeError: aliases is not a string array:", sdo.x_mitre_aliases, "(",typeof(sdo.x_mitre_aliases),")")
            } else this.aliases = [];

            if ("x_mitre_platforms" in sdo) {
                if (this.isStringArray(sdo.x_mitre_platforms)) this.platforms = sdo.x_mitre_platforms;
                else console.error("TypeError: x_mitre_platforms is not a string array:", sdo.x_mitre_platforms, "(",typeof(sdo.x_mitre_platforms),")")
            } else this.platforms = [];

            if ("x_mitre_contributors" in sdo) {
                if (this.isStringArray(sdo.x_mitre_contributors)) this.contributors = sdo.x_mitre_contributors;
                else console.error("TypeError: x_mitre_contributors is not a string array:", sdo.x_mitre_contributors, "(",typeof(sdo.x_mitre_contributors),")")
            } else this.contributors = [];
        }
    }
}