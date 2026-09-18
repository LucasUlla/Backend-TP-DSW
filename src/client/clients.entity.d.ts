import { Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Inscription } from "../inscription/inscription.entity.js";
import { Fee } from "../fee/fee.entity.js";
export type TipoDocumento = 'DNI' | 'Pasaporte';
export type TipoUsuario = 'Admin' | 'Socio';
export declare class Client extends BaseEntity {
    id: number;
    name: string;
    surname: string;
    email: string;
    doc: string;
    type_doc: TipoDocumento;
    password: string;
    birth_date: Date;
    type_user: TipoUsuario;
    inscriptions: Collection<Inscription, object>;
    fees: Collection<Fee, object>;
}
