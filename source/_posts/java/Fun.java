
//: Fun.java
// 魔高一尺，道高一丈！
import java.util.Random;


public class Fun {
    static long root = 0;

    public static final long DAO = 10;
    private static final long MO = 1;

    public static void main(String[] args) throws InterruptedException {

        Random timeToThink = new Random();

        while (true) {
            Thread.sleep(timeToThink.nextInt(100));
            moSay();

            Thread.sleep(timeToThink.nextInt(100));
            daoSay();
        }
    }

    static void moSay() {
        root = root + MO;
        long tmp = root;
        System.out.println("魔说：高你一尺：" + tmp);
    }

    static void daoSay() {
        root = root + DAO;
        long tmp = root;
        System.out.println("道说：高你一丈：" + tmp);
    }
} /* Output:
    魔说：高你一尺：1
    道说：高你一丈：11
    魔说：高你一尺：12
    道说：高你一丈：22
    ...
    ...
    *///:~
