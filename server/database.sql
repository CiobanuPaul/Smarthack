use smarthack;

create table user(
    id_user number(5) constraint usr_pk primary key,
    nume varchar(25),
    premune varchar(25),
    email varchar(50),
    data_inscriere date
);

create table problem(
    id_pb number(5) constraint pb_pk primary key,
    ptr_file varchar(25)
);

create table categorie(
    id_cat number(5),
    nume varchar(25)
);

create table AIReqs(
    id_pb number(5),
    id_req number(5),
    nume varchar(25),
    constraint AIR_pk primary key(id_pb,id_req),
    constraint AIR_pb_fk foreign key(id_pb) references problem
);

create table Pb_Cat(
    id_pb number(5),
    id_cat number(5),
    difficulty number(3),
    constraint PC_pk primary key(id_pb,id_cat),
    constraint PC_pb_fk foreign key(id_pb) references problem,
    constraint PC_cat_fk foreign key(id_cat) references categorie
);

create table rulare(
    id_rulare number(5) constraint rul_pk primary key,
    id_user number(5),
    id_pb number(5),
    time date,
    nota_rulare number(3),
    solution_ptr varchar(25); 
    constraint rul_usr_fk foreign key(id_user) references user,
    constraint rul_pb_fk foreign key(id_pb) references problem
);

create table noteAI(
    id_rulare number(5),
    id_pb number(5),
    id_req number(5),
    nota number(3),
    constraint NAI_rul_fk foreign key(id_rul) references rulare,
    constraint NAI_pbreq_fk foreign key(id_pb,id_req) references AIReqs,
    constraint NAI_pk primary key(id_rulare,id_pb,pd_req)
);