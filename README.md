# discrete-eltech

## Установка
Измените данные доступа для mongo и приложения в `docker-compose.yaml`
```
- MONGO_INITDB_ROOT_USERNAME=root
- MONGO_INITDB_ROOT_PASSWORD=password


- APP_DATABASE=user:secret@mongo:27017/evklid_db
- GOOGLE_CLIENT_SECRET=""
- GOOGLE_CLIENT_ID=""
- GOOGLE_CALBACK_URL=""
- GOOGLE_CALBACK_URL_LOGIN=""

```

Запустите docker-compose 
```
docker-compose up -d
```

Зайдите в mongo
```
docker-compose exec mongo bash
mongo -u root -p --authenticationDatabase admin
```

В mongo создайте пользователя и 2 коллекции
```
use evklid_db;

db.createUser(
   {
     user: "evklid",
     pwd: "pass",
     roles: [ "readWrite"]
   }
);

db.createCollection("students");
db.createCollection("tests");
```

Теперь приложение доступно по адресу `http://localhost:8888/`

## Поставленная задача
* нужно внимательно изучить оригинал модуля Ларина, который выложен на сайте и ПОЛНОСТЬЮ повторить его интерфейс (мы сделали в 2004 году с ним 11 версий, пока отточили все нюансы)
* нужны хорошие генераторы примеров, чтобы их длина была ни короткой, ни длинной, не говоря о том, что они не должны генерировать нерешаемые задачи;
* было бы хорошо расширить множество задач тремя модулями с другой таблицей:
  * перевод числа из одной системы счисления в другую умножением;
  * алгоритм быстрого возведения в степень;
  * схема Горнера для вычисления остатка от деления многочлена на двучлен.
