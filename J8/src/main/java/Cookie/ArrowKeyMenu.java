package Cookie;


import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.sql.*;

import static java.awt.event.KeyEvent.VK_ENTER;

public class ArrowKeyMenu extends JFrame {

    public ArrowKeyMenu(String[] items, JTextArea textAreaCookieAmount, JButton[] jButtons, JTextArea textAreaCookie, JPanel panel) {
        setTitle("Arrow Key Menu");
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(1920, 1080);
        setLocationRelativeTo(null);
        panel.setLayout(new FlowLayout());
        textAreaCookieAmount.append(items[0]);
        textAreaCookieAmount.setBackground(Color.BLACK);
        textAreaCookieAmount.setForeground(Color.WHITE);
        textAreaCookieAmount.setEditable(false);
        String cookie = """
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⡶⠾⠟⠻⠶⣶⣤⣤⣀⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣴⣾⠋⠁⢀⣠⣤⣤⣀⠀⠉⠛⠛⠛⠛⠛⠛⠿⢿⣿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣴⡶⠿⠿⠟⠛⠋⠁⠀⣰⣿⣟⣋⣻⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠬⣝⣻⣿⡷⠶⣶⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⡿⡏⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠳⢶⣬⣍⠛⢿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⡿⠟⢫⡼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣦⡘⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡾⢋⣥⣴⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⢿⣿⣦⡀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⢠⣿⠏⣠⡿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣦⡀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⡾⠃⣴⡿⠁⠀⠀⠀⠀⠀⢠⣶⣿⣿⢷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣯⠈⢿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠻⢿⣷⣄⠀⠀⠀
                ⠀⠀⠀⠀⠀⢠⡞⢀⣼⡟⠁⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣷⣄⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣷⣾⣿⡆⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⢢⠘⢿⣦⡀⠀
                ⠀⠀⠀⠀⣴⠏⣠⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣷⣾⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡟⠛⠿⣿⡿⠗⠀⠀⠀⢀⣴⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⣧⠘⣿⣷⠀
                ⠀⠀⢠⣾⠏⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⡿⣛⣿⣿⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡟⠙⣿⡇⠀⠀⠀⠀⢸⡇⣿⣿⠀
                ⠀⢠⣾⡏⠰⠁⠀⠀⠀⠀⣀⡄⠀⠀⠀⠀⠀⠀⠀⠋⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⢀⣿⠁⣿⣇⠀
                ⠀⢸⣿⠀⠀⢠⡄⣀⣴⡿⢿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠿⠿⣿⠿⠟⠁⠀⠀⠀⠀⠸⣿⡄⣿⣿⠀
                ⠀⢸⡏⠀⠀⠘⢿⣿⣿⣧⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⡼⣿⣇
                ⠀⣸⠇⠀⠀⠀⠈⢿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣶⣶⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⡷⣄⠀⠀⠀⠀⠀⠀⢀⣤⠀⢄⠀⢸⣿
                ⢀⡏⢠⠀⠀⠀⠀⠈⠻⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣏⠙⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠻⣿⣿⣿⣿⣿⡇⣼⠀⠀⠀⠀⠀⣴⣿⣿⡇⢸⡆⠀⣿
                ⣸⡇⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣀⣀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣆⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣧⣸⣿⣿⣿⡿⠴⠃⠀⠀⠀⢠⡾⢻⣿⣿⡇⢀⡇⢀⣿
                ⣿⡇⣿⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⡟⠻⣷⡄⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⡿⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠀⠀⠀⠀⠀⠀⠐⠟⢷⣾⣿⣿⡇⢸⡇⣼⡟
                ⢹⣧⢻⣆⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣷⣿⣿⠀⠀⠀⠀⠀⠀⠉⠛⠿⣿⣛⣫⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⠿⢠⡿⣹⡟⠀
                ⠀⢿⣎⢿⣦⣄⣠⣄⣀⣀⡀⠘⢿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⣵⡿⠀⠀
                ⠀⠈⢿⣦⣴⣿⣿⣮⣵⣿⣿⣷⣤⣽⣿⣟⡋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠇⣼⣿⡇⠀⠀
                ⠀⠀⠀⠻⠿⣛⣉⠙⢿⡿⠋⠉⠻⡿⠿⢿⣿⣿⣦⣄⡀⠀⠀⢀⣠⣤⣶⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⣤⣄⡀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡏⢸⣿⡿⠃⠀⠀
                ⠀⠀⠀⠀⠀⢘⡻⣷⠌⠀⠀⠿⠿⠀⠀⠀⠿⠟⠻⣿⡿⠆⠀⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⡹⣿⡆⠀⠀⠀⠀⣠⢞⣼⣿⠃⣼⣿⠁⠀⠀⠀
                ⠀⠀⠀⠀⠀⠸⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣦⠘⣿⣿⣿⣿⣿⠟⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣷⣾⡇⠀⠀⠀⣻⣷⣿⠟⢁⣼⣿⠃⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⡿⠀⢟⠿⣿⣿⣯⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⡿⢿⣿⠿⣿⠅⠀⢀⣾⣿⠟⣁⣴⣿⠟⠁⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠾⣷⣄⠈⠛⠶⠭⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠒⠛⠁⠀⢀⣼⡿⢣⣾⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣼⠄⢻⣿⠇⠀⠀⠀⠀⠀⠀⢀⣤⣤⡤⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⣿⢡⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠳⣿⣟⣀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣄⣾⣿⣧⠀⠀⣀⣀⣠⣴⣫⣾⡿⠿⠿⠿⠛⠛⣡⣾⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣹⣿⣏⣷⣖⣒⣄⣚⠏⣿⣿⣿⣿⣿⣿⡟⢀⣾⠿⣛⡛⢛⣋⣥⣤⣴⣶⣶⣶⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣅⣿⣿⡛⢛⣛⣛⣓⡮⠻⠿⠿⠟⠋⢴⣋⣤⣯⣽⣶⣿⣿⡿⠟⠛⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡿⣿⡟⠻⢿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣿⣿⠿⠛⠛⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀""";
        textAreaCookie.append(cookie);
        textAreaCookie.setBackground(Color.BLACK);
        textAreaCookie.setForeground(Color.WHITE);
        textAreaCookie.setEditable(false);
        for (int i = 0; i < jButtons.length; i++) {
            jButtons[i].setVisible(true);
            panel.add(jButtons[i]);
        }
        panel.add(textAreaCookie);
        panel.add(textAreaCookieAmount);

        add(panel);
        panel.setBackground(Color.black);

    }

    public static void main(String[] args) {
        Connection connection = createConnection();
//        createTable(connection);
        JPanel panel = new JPanel(new GridLayout(2, 10));
        JTextArea textAreaCookie = new JTextArea(10, 20);


        int userId = 1;


        // Perform database operations here
        JTextArea textAreaCookieAmount = new JTextArea(2, 2);
        String[] items = {"Cookies =" + getInt(connection, userId, "Cookies")};
        JButton buttonBuyGrandma = new JButton("Buy Grandma");
        JButton buttonBuyFabric = new JButton("Buy Fabric");
        JButton buttonBuyFarm = new JButton("Buy Farm");
        JButton buttonBuyBank = new JButton("Buy Bank");


        JButton[] jButtons = new JButton[]{buttonBuyGrandma, buttonBuyFarm, buttonBuyFabric, buttonBuyBank};
        ArrowKeyMenu menu = new ArrowKeyMenu(items, textAreaCookieAmount, jButtons, textAreaCookie, panel);
        for (int i = 0; i < 1; i++) {
            ThreadForCookieProducers object = new ThreadForCookieProducers(menu, textAreaCookieAmount, connection, userId);
            object.start();
        }
        for (int i = 0; i < 1; i++) {
            ThreadToUpdate object = new ThreadToUpdate(textAreaCookieAmount, menu, userId, connection);
            object.start();
        }
        SwingUtilities.invokeLater(() -> {
            menu.setVisible(true);
        });
        buttonBuyGrandma.addActionListener(e -> {
            if (getInt(connection, userId, "Cookies") >= 100) {
                buttonPressed(connection, userId, "Grandmas", -100);
            }
        });
        buttonBuyFabric.addActionListener(e -> {
            if (getInt(connection, userId, "Cookies") >= 10000) {
                buttonPressed(connection, userId, "Fabric", -10000);
            }
        });
        buttonBuyFarm.addActionListener(e -> {
            if (getInt(connection, userId, "Cookies") >= 1000) {
                buttonPressed(connection, userId, "Farm", -1000);
            }
        });
        buttonBuyBank.addActionListener(e -> {
            if (getInt(connection, userId, "Cookies") >= 100000) {
                buttonPressed(connection, userId, "Bank", -100000);
            }
        });
        ActionMap actionMap = panel.getActionMap();
        actionMap.put(VK_ENTER, new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                updateInt(connection, userId, 1, "Cookies");
            }
        });
    }


    public static void createTable(Connection connection) {
        String createTableAllSubjects = "CREATE TABLE CookieGame (" +
                "id INT PRIMARY KEY AUTO_INCREMENT," +
                "Cookies INT DEFAULT 0," +
                "Grandmas INT DEFAULT 0," +
                "Fabric INT DEFAULT 0," +
                "Farm INT DEFAULT 0" +
                ");";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(createTableAllSubjects);
            preparedStatement.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static Connection createConnection() {
        String jdbcUrl = "jdbc:mariadb://localhost:3306/Cookie";
        String username = "root";
        String password = "root";
        try {
            Connection connection = DriverManager.getConnection(jdbcUrl, username, password);
            return connection;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static int getInt(Connection connection, int userId, String column) {
        try {
            Statement statement = connection.createStatement();
            ResultSet set = statement.executeQuery("SELECT " + column + " FROM Cookiegame WHERE id = " + userId + ";");
            set.next();
            int amount = set.getInt(column);
            return amount;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void updateInt(Connection connection, int userid, int value, String column) {
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_UPDATABLE);
            ResultSet set = statement.executeQuery("SELECT " + column + ",id FROM Cookiegame WHERE id =" + userid + ";");
            set.next();
            set.updateInt(column, getInt(connection, userid, column) + value);
            set.updateRow();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void buttonPressed(Connection connection, int userId, String column, int price) {
        updateInt(connection, userId, 1, column);
        updateInt(connection, userId, price, "Cookies");
    }
}
