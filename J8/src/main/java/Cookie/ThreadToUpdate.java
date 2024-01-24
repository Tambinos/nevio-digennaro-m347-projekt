package Cookie;

import javax.swing.*;
import java.awt.*;
import java.sql.Connection;

public class ThreadToUpdate extends Thread{
    JTextArea textAreaCookieAmount;
    ArrowKeyMenu menu;
    int userId;
    Connection connection;

    public ThreadToUpdate(JTextArea textAreaCookieAmount, ArrowKeyMenu menu, int userId, Connection connection) {
        this.textAreaCookieAmount = textAreaCookieAmount;
        this.menu = menu;
        this.userId = userId;
        this.connection = connection;
    }

    public void run(){
        try {
            System.out.println(
                    "Thread " + Thread.currentThread().getId()
                            + " is running");
            while (true){
                textAreaCookieAmount.setText("Cookies =" + ArrowKeyMenu.getInt(connection,userId,"Cookies"));
                menu.revalidate();
                menu.repaint();

            }
        }catch (Exception e){

        }
    }
}