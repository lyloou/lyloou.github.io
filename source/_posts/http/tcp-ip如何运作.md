---
title: tcp-ip
date: 2018-10-11 11:03:54
toc: true
comments: true
tags:
- http
---

## 为什么要分层？

- 各层互相独立。  
各层之间通过接口通信，接口不变，内部可以随意调整。降低了整个问题的复杂度。
- 灵活。  
只要保证接口不变，技术革新不会引起其他层的变化。排除问题也需要只关注当前层。
- 结构上可分开。各层都可以采用最合适的技术来实现。  
避免木桶效应，因为某一方面的技术不完善而影响 整体工作效率。
- 易于实现和维护。  
将整个系统拆分成若干个相对独立的子系统。进行调试和维护时，可以对每一层单独调试，
易于排查和解决问题。
- 促进标准化工作。  
精确定位各层的功能和服务。标准化后，可以随意替换某几层，对于使用和科研十分方便。

---
参考：
- [为什么计算机网络协议都是分层的？有什么好处？ - 申请方](https://www.applysquare.com/topic-cn/V9UHWe49W/)
- [The OSI Model – What It Is; Why It Matters; Why It Doesn't Matter.](http://www.tech-faq.com/osi-model.html)

## 分了哪几层？
![](http://img.hb.aicdn.com/13cfad969ef263cbd2dbe10df1d7086630d909e298d1-ncE989_fw658)
![](http://img.hb.aicdn.com/a5173f12197048ac74fc34c3cc44eb1ca0b9aa526c02-GQ8FwZ_fw658)

那 TCP/IP 是如何运作的呢？我们就拿妳常常连上的 Yahoo 入口网站来做个说明好了，整个联机的状态可以这样看：

应用程序阶段：妳打开浏览器，在浏览器上面输入网址列，按下 [Enter]。此时网址列与相关数据会被浏览器包成一个数据， 并向下传给 TCP/IP 的应用层；
应用层：由应用层提供的 HTTP 通讯协议，将来自浏览器的数据报起来，并给予一个应用层表头，再向传送层丢去；
传送层：由于 HTTP 为可靠联机，因此将该数据丢入 TCP 封包内，并给予一个 TCP 封包的表头，向网络层丢去；
网络层：将 TCP 包裹包进 IP 封包内，再给予一个 IP 表头 (主要就是来源与目标的 IP 啰)，向链结层丢去；
链结层：如果使用以太网络时，此时 IP 会依据 CSMA/CD 的标准，包裹到 MAC 讯框中，并给予 MAC 表头，再转成位串后， 利用传输媒体传送到远程主机上。
等到 Yahoo 收到你的包裹后，在依据相反方向拆解开来，然后交给对应的层级进行分析，最后就让 Yahoo 的 WWW 服务器软件得到你所想要的数据，该服务器软件再根据你的要求，取得正确的资料后，又依循上述的流程，一层一层的包装起来， 最后传送到你的手上！就是这样啰！

来源： http://cn.linux.vbird.org/linux_server/0110network_basic_1.php#ps4

## [TCP协议三次握手过程分析 - 一江水 - 博客园](https://www.cnblogs.com/rootq/articles/1377355.html)
TCP(Transmission Control Protocol)传输控制协议
TCP是主机对主机层的传输控制协议，提供可靠的连接服务，采用三次握手确认建立一个连接：

位码即tcp标志位，有6种标示：SYN(synchronous建立联机) ACK(acknowledgement 确认) PSH(push传送) FIN(finish结束) RST(reset重置) URG(urgent紧急)Sequence number(顺序号码) Acknowledge number(确认号码)

第一次握手：主机A发送位码为syn＝1，随机产生seq number=1234567的数据包到服务器，主机B由SYN=1知道，A要求建立联机；

第二次握手：主机B收到请求后要确认联机信息，向A发送ack number=(主机A的seq+1)，syn=1，ack=1，随机产生seq=7654321的包；
第三次握手：主机A收到后检查ack number是否正确，即第一次发送的seq number+1，以及位码ack是否为1，若正确，主机A会再发送ack number=(主机B的seq+1)，ack=1，主机B收到后确认seq值与ack=1则连接建立成功。