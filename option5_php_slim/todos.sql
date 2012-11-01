create table todos(
  id int not null primary key auto_increment,
  content varchar(50),
  done tinyint(1),
  'order' int
);
