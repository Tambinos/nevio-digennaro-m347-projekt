package AufgabeOOP.Aufgabe4Object;

import java.util.ArrayList;

import static AufgabeOOP.Aufgabe4Object.Firma.firma;

public class Immobilie {
    String name;
    String abwart;
    String verwalter;
    int wohnungen;
    Firma ownerFirma;
    String address;

    public Immobilie(String name, String abwart, String verwalter, int wohnungen, Firma ownerFirma, String address) {
        this.name = name;
        this.abwart = abwart;
        this.verwalter = verwalter;
        this.wohnungen = wohnungen;
        this.ownerFirma = ownerFirma;
        this.address = address;
    }
    public static ArrayList<Immobilie> immobilie(){
        ArrayList<Immobilie> immobilieArrayList = new ArrayList<>();
        Immobilie tulp = new Immobilie("tulp","Joseph","Josia",3,firma().get(0),"Tulpenweg 11");
        Immobilie neufeld = new Immobilie("neufeld","Miguel","Joel",8,firma().get(0),"Neufeldweg 19");
        Immobilie oberfeld = new Immobilie("oberfeld","Marc","Levin",2,firma().get(0),"Oberfeldweg 10");
        immobilieArrayList.add(tulp);
        immobilieArrayList.add(neufeld);
        immobilieArrayList.add(oberfeld);
        return immobilieArrayList;
    }
    public static int wohnungenresult(){
        int result = immobilie().get(0).wohnungen + immobilie().get(1).wohnungen + immobilie().get(2).wohnungen;
        return result;
    }
    public static int[] emptyWohnungen(){
        for (int i = 0; i <immobilie().size() ; i++) {
            for (int j = 1; j <immobilie().get(i).wohnungen ; j++) {
                int [] empty = new int[]{i};
                return empty;
            }
        }
        return null;
    }
}
