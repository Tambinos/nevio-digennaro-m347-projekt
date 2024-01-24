package Cookie;


import javax.swing.*;
import java.sql.Connection;

class ThreadForCookieProducers extends Thread {

    ArrowKeyMenu menu;
    JTextArea textAreaCookieAmount;
    Connection connection;
    int userid;

    public ThreadForCookieProducers(ArrowKeyMenu menu, JTextArea textAreaCookieAmount, Connection connection, int userid) {
        this.menu = menu;
        this.textAreaCookieAmount = textAreaCookieAmount;
        this.connection = connection;
        this.userid = userid;
    }

    public void run() {
        try {
            System.out.println(
                    "Thread " + Thread.currentThread().getId()
                            + " is running");
            while (true) {
                if (ArrowKeyMenu.getInt(connection, this.userid, "Grandmas") >= 1) {
                    ArrowKeyMenu.updateInt(connection, userid, ArrowKeyMenu.getInt(connection, userid, "Grandmas"), "Cookies");
                }
                if (ArrowKeyMenu.getInt(connection,userid,"Farm") >= 1) {
                    ArrowKeyMenu.updateInt(connection, userid, ArrowKeyMenu.getInt(connection, userid, "Farm")*10, "Cookies");

                }
                if (ArrowKeyMenu.getInt(connection,userid,"Fabric") >= 1) {
                    ArrowKeyMenu.updateInt(connection, userid, ArrowKeyMenu.getInt(connection, userid, "Fabric")*150, "Cookies");
                }
                if (ArrowKeyMenu.getInt(connection,userid,"Bank") >= 1) {
                    ArrowKeyMenu.updateInt(connection, userid, ArrowKeyMenu.getInt(connection, userid, "Bank")*1500, "Cookies");
                }
                try {
                    Thread.sleep(2000);
                } catch (Exception e) {
                    throw new RuntimeException();
                }
            }
        } catch (RuntimeException e) {
            System.out.println("Exception is caught");
        }
    }
}