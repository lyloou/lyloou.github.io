---
title: 【ruby】 tool
date: 2019-07-23 14:30:13
toc: true
comments: true
tags:
  - ruby
---

## HTTP 服务

```ruby
ruby -run -e httpd . -p 5000
```

Q: [2019-07-23 17:21:43] ERROR Encoding::CompatibilityError: incompatible character encodings: ASCII-8BIT and UTF-8
A: 参考[Jekyll 本地预览时路径中有中文不能编码无法预览 - Jhutha Sach](https://jhuthasach.com/skills/2018/03/21/Jekyll%E4%B8%AD%E6%96%87%E4%B8%8D%E8%83%BD%E6%AD%A3%E5%B8%B8%E7%BC%96%E7%A0%81%E9%A2%84%E8%A7%88/)

```ruby
# vi /usr/lib/ruby/2.3.0/webrick/httpservlet/filehandler.rb
520           s =  "<TR><TD class=\"name\"><A HREF=\"#{HTTPUtils::escape(name)}#{query if name.end_with?('/')}\">#{HTMLUtils::escape(dname)}</A></TD>"
521           s << "<TD class=\"mtime\">" << (time ? time.strftime("%Y/%m/%d %H:%M") : "") << "</TD>"
522           s << "<TD class=\"size\">" << (size >= 0 ? size.to_s : "-") << "</TD></TR>\n"
523           res.body.force_encoding("UTF-8") # ============> add this line
524           res.body << s
525         }
526         res.body << "</TBODY></TABLE>"
527         res.body << "<HR>"
```

- [Ruby Simple HTTP Server, minimalist Rake | Benjamin Oakes](http://www.benjaminoakes.com/2013/09/13/ruby-simple-http-server-minimalist-rake/)

**tip: 快速重启脚本**

```sh
# vi .bashrc
# add below line
alias xapk='/usr/local/src/apk-server/restart.sh'
```

```sh
# restart.sh
echo kill service ...
ps -aux | grep ruby | grep 9090 | cut -c 9-15 | xargs kill -15
echo start service ...
# cd /usr/local/src/apk-server/smbshare && nohup python -m SimpleHTTPServer 9090 > /dev/null 2>&1 &
cd /usr/local/src/apk-server/smbshare && nohup ruby -run -e httpd . -p 9090 > /dev/null 2>&1 &
echo oked
```
