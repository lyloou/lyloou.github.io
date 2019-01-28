---
title: 关于SQLite的总结
date: 2016-07-13 09:17:54
toc: true
tags:
- android
- sql
---

## C (Create)
使用自带API：
``` java
db = dbHelper.getWritableDatabase();
ContentValue values = new ContentValue();
values.put("name", "第一行代码");
values.put("author", "郭霖");
values.put("price", "79.99");
values.put("pages", "552");
db.insert("Book", null, values);
values.clear();
```

使用数据库语句：
``` java
db = dbHelper.getWritableDatabase();
db.execSQL("insert into Book (name, author, pages, price) values (?, ?, ?, ?)", new String[]{ "第一行代码", "郭霖", "552", "79.00"});
```

## R (Retrieve)
使用自带API：
``` java
Cursor cursor = db.query("Book", null, null, null, null, null, null);
```

使用数据库语句：
``` java
db = dbHelper.getReadableDatabase();
Cursor cursor = db.rawQuery("SELECT id, name FROM people WHERE name = ? AND id = ?", new String[] {"David", "2"});
if(cursor.moveToFirst()){
  do{
    String name = cursor.getString(cursor.getColumnIndex("name"));
    String id = cursor.getString(cursor.getColumnIndex("id"));

    Log.e("TAG", "name = " + name);
    Log.e("TAG", "id = " + id);
  } while (cursor.moveToNext());
}
cursor.close();
```


## U (Update)
使用自带API：
``` java
db = dbHelper.getWritableDatabase();
ContentValue values = new ContentValue();
values.put("price", 79.99);
db.update("Book", values, "name = ?", new String[]{ "第一行代码" });
```

使用数据库语句：
``` java
db = dbHelper.getWritableDatabase();
db.execSQL("update Book set price = ? where name = ?", new String[]{ "79.99", "第一行代码" })
```

## D (Delete)
使用自带API：
``` java
db = dbHelper.getWritableDatabase();
db.delete("Book", "page > ?", new String[]{ "500" });
```

使用数据库语句：
``` java
db = dbHelper.getWritableDatabase();
db.execSQL("delete from Book where pages > ?", new String[]{ "500" })
```

---
## 使用事务（保证数据操作的原子性）
``` java
SQLiteDatabase db = mDbHelper.getWritableDatabase();
try {
   db.beginTransaction();

   String position = mode.getPosition().ordinal() + "";
   String action = mode.getAction().ordinal() + "";

   ContentValues values = new ContentValues();
   values.put("color", mode.getColor());
   values.put("used", mode.isUsed() ? 1 : 0);
   values.put("level", mode.getLevel());
   values.put("time", mode.getTime());

   db.update(TABLE_NAME, values, " position=? and action = ? ", new String[]{position, action});
   values.clear();

   db.setTransactionSuccessful();
} catch (Exception e) {
  e.printStackTrace();
} finally {
   db.endTransaction();
   db.close();
}
```

---
## 外部链接
- [rawQuery(query, selectionArgs)](http://stackoverflow.com/questions/10598137/rawqueryquery-selectionargs)
- 《第一行代码》（第六章 数据存储全方案，详解持久化技术）
