use smarthack;

create table users(
    id_user int AUTO_INCREMENT,
    nume varchar(25),
    prenume varchar(25),
    email varchar(50),
    pass varchar(50), 
    data_inscriere date,
    constraint usr_pk primary key(id_user)
);

create table problem(
    id_pb int AUTO_INCREMENT,
    ptr_file varchar(25),
    nume varchar(25),
    constraint pb_pk primary key(id_pb)
);

create table categorie(
    id_cat  int AUTO_INCREMENT,
    nume varchar(25),
     constraint cat_pk primary key(id_cat)
);

create table AIReqs(
    id_req int int AUTO_INCREMENT,
    nume varchar(25),
    constraint AIR_pk primary key(id_req),
);

create table Pb_Cat(
    id_pb int,
    id_cat int,
    difficulty DECIMAL(3),
    constraint PC_pk primary key(id_pb,id_cat),
    constraint PC_pb_fk foreign key(id_pb) references problem(id_pb),
    constraint PC_cat_fk foreign key(id_cat) references categorie(id_cat)
);

create table rulare(
    id_rulare int AUTO_INCREMENT,
    id_user int,
    id_pb int,
    time date,
    nota_rulare DECIMAL(3),
    solution_ptr varchar(25), 
    constraint rul_usr_fk foreign key(id_user) references users(id_user),
    constraint rul_pb_fk foreign key(id_pb) references problem(id_pb),
    constraint rul_pk primary key(id_rulare)
);

create table noteAI(
    id_rulare int,
    id_req int,
    nota DECIMAL(3),
    constraint NAI_rul_fk foreign key(id_rulare) references rulare(id_rulare),
    constraint NAI_req_fk foreign key(id_req) references AIReqs(id_req),
    constraint NAI_pk primary key(id_rulare,id_req)
);

create table sessions(
    id_session int AUTO_INCREMENT,
    id_user int,
    token varchar(50),
    constraint ss_user_fk foreign key(id_user) references users(id_user),
    cosntraint ss_pk primary key(id_session)
 )