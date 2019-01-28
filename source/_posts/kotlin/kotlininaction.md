---
title: Kotlin In Action笔记
date: 2018-12-05 22:03:34
toc: true
comments: true
tags:
- kotlin
---

Only after understanding the surrounding code can you make the necessary
modifications.

Note that omitting the return type is allowed only for functions with an expression
body


Note that this example shows the
only place in the Kotlin syntax where you’re required to use semicolons: if you define
any methods in the enum class, the semicolon separates the enum constant list from the
method definitions.


The rule "the last expression in a block is the result" holds in all cases where a block
can be used and a result is expected. As you’ll see at the end of this chapter, the same
rule works for the try body and catch clauses, and chapter 5 discusses its application to
lambda expressions. But as we already mentioned in section 2.2.1, this rule doesn’t hold
for regular functions. A function can have either an expression body that can’t be a block,
or a block body with explicit return statements inside.
p41

Just like many other modern JVM languages, Kotlin doesn’t differentiate between
checked and unchecked exceptions. You don’t specify the exceptions thrown by a
function, and you may or may not handle any exceptions. This design decision is based
on the practice of using checked exceptions in Java. Experience has shown that the Java
rules often require a lot of meaningless code to rethrow or ignore exceptions, and the
rules don’t consistently protect you from the errors that can happen.
p48

Note that extension
functions don’t allow you to break encapsulation. Unlike methods defined in the class,
extension functions don’t have access to private or protected members of the class.
p61

Method overriding in Kotlin works as usual for member functions, but you can’t override
an extension function.
the function that’s called depends on the static type of the
variable being declared, not on the runtime type of the value stored in that variable.
p64-p65

Note: If the class has a member function with the same signature as an
extension function, the member function always takes precedence.
You should keep this in mind when extending the API of classes: if
you add a member function with the same signature as an
extension function that a client of your class has defined, and they
then recompile their code, it will change its meaning and start
referring to the new member function. 
p65
//TODO but how to override CharSequence.split, if the member function always takes precedence ???
```kotlin
class A(var c: String) {
    fun getDiffC(): String {
        return "---$c---"
    }

    fun getDiffD(): String {
        return "!!!!!$c!!!!!"
    }
}
fun A.getDiffD(): String = "====${this.c}===="
fun main(args: Array<String>) {
    println(A("a").getDiffC())
    println(A("d").getDiffD())
}
```


The destructuring declaration feature isn’t limited to pairs. For example, you can
assign a map entry to two separate variables, key and value , as well.
p69

The to function is an extension function. You can create a pair of any elements,
which means it’s an extension to a generic receiver: you can write `1 to "one"` , 
`"one" to 1` , `list to list.size()` , and so one.
Even though the creation of a new map may look like a special construct in Kotlin,
it’s a regular function with a concise syntax

```kotlin
1.to("one)
// ====equivalent====
1 to "one"
```
p70



local functions and extensions
Kotlin gives you a cleaner solution: you can nest the functions you’ve extracted in the
containing function. This way, you have the structure you need without any extra
syntactic overhead. (meaning fun in fun)
p75
```kotlin
class User(val id: Int, val name: String, val address: String)

fun saveUser(user: User) {
    fun validate(user: User,
                 value: String,
                 fieldName: String) {
        if (value.isEmpty()) {
            throw IllegalArgumentException(
                    "Cannot save user ${user.id}: $fieldName is empty")
        }
    }
    validate(user, user.name, "Name")
    validate(user, user.address, "Address")
// Save user to the database
}
```


## 4
Declaring a class as a `data` class instructs the compiler to generate several standard methods 
for this class. You can also avoid writing delegating methods by hand, because the delegation
pattern is supported natively in Kotlin.
p78

This chapter also describes a new `object` keyword that declares a class and also
creates an instance of the class. The keyword is used to express singleton objects,
companion objects, and object expressions
p78


Unlike Java, using the override modifier is mandatory in Kotlin
p79

Whereas Java’s classes and methods are open by
default, Kotlin’s are final by default.
If you want to allow the creation of subclasses of a class, you need to mark the class
with the open modifier. In addition, you need to add the open modifier to everyproperty
or method that can be overridden
p82

Note that if you override a member of a base class or interface, the overriding
member will also be open by default. If you want to change this and forbid the subclasses
of your class from overriding your implementation, you can explicitly mark the
overriding member as final.(不像java中的修饰符不能缩小权限，kotlin中可以)
p83

The meaning of access modifiers in a class (p84)

|Modifier | Corresponding member| Comments
|:---|:---|:---|
|final| Can’t be overridden| Used by default for class members
|open | Can be overridden| Should be specified explicitly
|abstract| Must be overridden| Can be used only in abstract classes; abstract members can’t have an implementation
|override| Overrides a member in a superclass |Overridden member is open by default, if not marked final

Kotlin offers a new visibility modifier, `internal`, which means
"visible inside a module." A module is a set of Kotlin files compiled together. It may be
an IntelliJ IDEA module, an Eclipse project, a Maven or Gradle project, or a set of files
compiled with an invocation of the Ant task.
p84

kotlin visibility modifiers (p85)

|Modifier | Class Member | Top-level declaration
|:---|:---|:---
| public(default) | Visible everywhere | Visible everywhere
| internal | Visible in a moudle | Visible in a moudle
| protected | Visible in a subclasses | ---
| private | Visible in a class | Visible in a file

This is a case of a general rule that
requires all types used in the list of base types and type parameters of a class, or the
signature of a method, to be as visible as the class or method itself. This rule ensures that
you always have access to all types you might need to invoke the function or extend a
class.
p85

Note the difference in behavior for the protected modifier in Java and in Kotlin. In
Java, you can access a protected member from the same package, but Kotlin doesn’t
allow that. In Kotlin, visibility rules are simple, and a protected member is only visible
in the class and its subclasses. Also note that extension functions of a class don’t get
access to its private or protected members.
p85


The difference
is that Kotlin nested classes don’t have access to the outer class instance, unless you
specifically request that.
p86


A nested class in Kotlin with no explicit modifiers is the same as a static nested
class in Java. To turn it into an inner class, so that it contains a reference to an outer
class, you use the inner modifier.
p88

|Class A declared within another class B| In Java | In Kotlin
|:---|:---|---
| Nested class (doesn't store a reference to an outer class) | static class A | class A
| Inner class (store a reference to an outer class) | class A | inner class A
```kotlin
class Outer {
    inner class Inner {
        fun getOuterReference(): Outer = this@Outer
    }
}
```
p88


In Java, as you know, a class can declare one or more constructors. Kotlin is similar, with
one additional change: it makes a distinction between a primary constructor (which is
usually the main, concise way to initialize a class and is `declared outside of the class body`)
and a secondary constructor (which is `declared in the class body`). It also allows
you to put additional initialization logic in initializer blocks
```kotlin
// This block of code surrounded by parentheses is called a primary constructor. It serves two
// purposes: specifying constructor parameters and defining properties that are initialized by
// those parameters.
class User(val nickname: String)


```
p91


If your class has a superclass, the primary constructor also needs to initialize the
superclass. You can do so by providing the superclass constructor parameters after the
superclass reference in the base class list:
```kotlin
open class User(val nickname: String) { ... }
class TwitterUser(nickname: String) : User(nickname) { ... }
```
p93

If you inherit the Button class and don’t provide any constructors, you have to
explicitly invoke the constructor of the superclass even if it doesn’t have any parameters:
```kotlin
open class Button

class RadioButton: Button()
```
That’s why you need empty parentheses after the name of the superclass. Note the
difference with interfaces: interfaces don’t have constructors, so if you implement an
interface, you never put parentheses after its name in the supertype list.
p93

If you want to ensure that your class can’t be instantiated by other code, you have to
make the constructor private
```kotlin
class Secretive private constructor() {}

// or
class Secretive {
    private constructor()
}

// or use : companion objects
```
p94


`secondary constructor`
The below class doesn’t declare a primary constructor (as you can tell because there are no
parentheses after the class name in the class header), but it declares two secondary
constructors. A secondary constructor is introduced using the `constructor` keyword
You can declare as many secondary constructors as you need.
```kotlin
open class View {
    constructor(ctx: Context) {
        // some code
    }

    constructor(ctx: Context, attr: AttributeSet) {
        // some code
    }
}
```
If you want to extend this class, you can declare the same constructors:
```kotlin
class MyButton : View {
    constructor(ctx: Context) : super(ctx) {
        // ...
    }

    constructor(ctx: Context, attr: AttributeSet) : super(ctx, attr) {
        // ...
    }
}
```
p95

If the class has no primary constructor, then each secondary constructor has to
initialize the base class or delegate to another constructor that does so. Thinking in terms
of the previous figures, each secondary constructor must have an outgoing arrow starting
a path that ends at any constructor of the base class.
p96


```kotlin
class User(val name: String) {
    var address: String = "unspecified"
        set(value: String) {
            println("""
                Address was changed for $name:
                "$field" -> "$value".""".trimIndent())
            field = value
        }
}
```
In the body of the setter, you use the special identifier field to access the value of
the backing field. In a getter, you can only read the value; and in a setter, you can both
read and modify it.
In the body of the setter, you use the special identifier field to access the value of
the backing field. In a getter, you can only read the value; and in a setter, you can both
read and modify it.
Note that you can redefine only one of the accessors for a mutable property. The
getter in the previous example is trivial and just returns the field value, so you didn’t
need to redefine it
p99

In Kotlin, == is the default way to compare two objects: it compares their
values by calling equals under the hood. Thus, if equals is overridden in
your class, you can safely compare its instances using == . For reference
comparison, you can use the === operator, which works exactly thesame
as == in Java.
p102

Note that properties that aren’t declared in the primary
constructor don’t take part in the equality checks and hashcode calculation.
p104


```ini
- You use the field identifier to reference a property backing field from the accessor body.
- Data classes provide compiler-generated equals() , hashCode() , toString() , copy() , and other methods.
- Companion objects (along with package-level functions and properties) replace Java’s static method and field definitions.
- Companion objects, like other objects, can implement interfaces or have extension functions or properties.
- Object expressions are Kotlin’s replacement for Java’s anonymous inner classes, with 
    added power such as the ability to implement multiple interfaces and to modify the
    variables defined in the scope where the object is created.
```

# 5
```kotlin
{x:Int, y:Int -> x+y}
```
A lambda expression in Kotlin is always surrounded by curly braces. Note that there
are no parentheses around the arguments. The arrow separates the argument list from the
body of the lambda.
p122

The road of improvement
```kotlin
data class Person(val name: String, val age: Int)
val people = listOf(Person("lisi", 18), Person("wangwu", 15))
people.maxBy({p:Person -> p.age})
```
In Kotlin, a syntactic convention lets you move a lambda expression out of parentheses 
if it’s the last argument in a function call. 
In this example, the lambda is the only argument, so it can be placed
after the parentheses:
```kotlin
people.maxBy() { p: Person -> p.age }
```
When the lambda is the only argument to a function, you can also remove the empty
parentheses from the call:
```kotlin
// If a lambda is the only argument, you’ll definitely want to write it without the parentheses.
people.maxBy { p: Person -> p.age }
```
As with local variables, if the type of a lambda parameter can be inferred, you don’t
need to specify it explicitly.
```kotlin
people.maxBy { p -> p.age }
```
The last simplification you can make in this example is to replace an argument with
the default argument name: `it` . This name is generated if the context expects a lambda
with only one argument, and its type can be inferred:
```kotlin
peopel.maxBy {it.age}
```
p125


One important difference between Kotlin and Java is that in Kotlin, you aren’t
restricted to accessing final variables. You can also modify variables from within a
lambda. The next example counts the number of client and server errors in the given set
of response status codes:
```kotlin
fun printProblemCounts(responses: Collection<String>) {
    var clientErrors = 0
    var serverErrors = 0
    responses.forEach {
        if (it.startsWith("4")) {
            clientErrors++
        } else if (it.startsWith("5")) {
            serverErrors++
        }
    }
    println("$clientErrors client errors, $serverErrors server errors")
}
```
Note that, by default, the lifetime of a local variable is constrained by the function in
which the variable is declared. But if it’s captured by the lambda, the code that uses this
variable can be stored and executed later. You may ask how this works. When you
capture a final variable, is value is stored together with the lambda code that uses it. For
non-final variables, the value is enclosed in a special wrapper that lets you change it, and
the reference to the wrapper is stored together with the lambda.
p127


An important caveat is that, if a lambda is used as an event handler or is otherwise
executed asynchronously, the modifications to local variables will occur only when the
lambda is executed. For example, the following code isn’t a correct way to count button
clicks:
```kotlin
fun tryToCountButtonClicks(button: Button): Int {   
    var clicks = 0
    button.onClick { clicks++ }
    return clicks // always return 0, you should store the clicks variable 
                  // in a location that remains accessible outside of the function
}
```
p128



```kotlin
// smaple1
people.filter { it.age == people.maxBy(Person::age).age } // not work well with performance, because calculate maxAge everytime

// sample2
val maxAge = people.maxBy(Person::age).age // work well, only compulate once
people.filter { it.age == maxAge }
```
Don’t repeat a calculation if you don’t need to! Simple-looking code using lambda
expressions can sometimes obscure the complexity of the underlying operations, so
always keep in mind what is happening in the code you write.
p133


The entry point for lazy collection operations in Kotlin is the Sequence interface. The
interface represents just that: a sequence of elements that can be enumerated one by one.
Sequence provides only one method, iterator , that you can use to obtain the values
from the sequence.
```kotlin
people.asSequence() // the lazy way more efficient than eager way when there are a million data.
.map(Person::name)
.filter { it.startsWith("A") }
.toList()
```
p138

Note
As a rule, use a sequence whenever you have a chain of
operations on a large collection. In section 8.2, we’ll discuss why
eager operations on regular collections are efficient in Kotlin, in
spite of creating intermediate collections. But if the collection
contains a large number of elements, the intermediate rearranging
of elements costs a lot, so lazy evaluation is preferable.
p139


The order of the operations you perform on a collection can affect performance as
well.
If map goes first, each element is transformed. If you apply filter first,
inappropriate elements are filtered out as soon as possible and aren’t transformed.
p141

SAM: single abstract method p144

In addition to returning values, SAM constructors are used when you need to store a
functional interface instance generated from a lambda in a variable. Suppose you want to
reuse one listener for several buttons, as in the following example (in an Android
application, this code can be a part of the Activity.onCreate method):
```kotlin
val listener = OnClickListener { view ->
    val text = when (view.id) {
        R.id.button1 -> "First button"
        R.id.button2 -> "Second button"
        else -> "Unknown button"
    }
    toast(text)
}
button1.setOnClickListener(listener)
button2.setOnClickListener(listener)
```
p147

Note that there’s no this in a lambda as there is in an anonymousobject:
there’s no way to refer to the anonymous class instance into which the
lambda is converted. From the compiler’s point of view, the lambda is a
block of code, not an object, and you can’t refer to it as an object. 
`The 'this' reference in a lambda refers to a surrounding class.`
p148

If your event listener needs to unsubscribe itself while handling an event,
you can’t use a lambda for that. Use an anonymous object to implement
a listener, instead. In an anonymous object, the this keyword refers to
the instance of that object, and you can pass it to the API that removes
the listener.
```
val  anonymousObject: Runnable = object : Runnable {
    override fun run() {
        println("world")
    }
}
Computation().postponeComputation(1, anonymousObject)
```
p148

# 6
To reiterate, a type without a question mark denotes that variables of this type can’t
store null references. This means all regular types are non- null by default, unless
explicitly marked as nullable.
p156

