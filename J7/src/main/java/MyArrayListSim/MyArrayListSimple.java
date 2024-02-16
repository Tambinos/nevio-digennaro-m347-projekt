package MyArrayListSim;


public class MyArrayListSimple<T> implements MyListInterfaceSimple {
    private Object[] content;

    public static void main(String[] args) {
        MyArrayListSimple myArrayListSimple = new MyArrayListSimple();
        String ka = "adada";
        String[] ok = {"122", "1313"};
        myArrayListSimple.add(ok);
        myArrayListSimple.add(ka);
        System.out.println(myArrayListSimple.toString());
    }

    @Override
    public void add(Object element) {
        if (this.content != null) {
            Object[] newContent = new Object[this.content.length + 1];
            System.arraycopy(this.content, 0, newContent, 0, content.length);
            newContent[this.content.length] = element;
            this.content = newContent;
        } else {
            this.content = new Object[]{element};
        }
    }

    public Object get(int index) {
        return this.content[index];
    }

    @Override
    public Object remove(int index) throws IndexOutOfBoundsException {
        if (this.content != null) {
            if (index <= this.content.length) {
                Object toBeRemoved = this.content[index];
                for (int i = index; i < this.content.length - 1; i++) {
                    this.content[i] = this.content[i + 1];
                }
                Object[] newContent = new Object[this.content.length - 1];
                System.arraycopy(this.content, 0, newContent, 0, this.content.length - 1);
                this.content = newContent;
                return toBeRemoved;

            } else {
                throw new IndexOutOfBoundsException();
            }
        }
        return null;
    }

    @Override
    public int size() {
        if (this.content == null) {
            return 0;
        } else {
            return this.content.length;
        }
    }

    @Override
    public boolean isEmpty() {
        try {
            Object a = this.content[0];
            return false;
        } catch (Exception e) {
            return true;
        }
    }

    @Override
    public void clear() {
        this.content = new Object[]{};
    }

    public String toString() {
        if (this.content == null) {
            return "";
        }
        String toReturn = "";
        for (Object obj : this.content) {
            if (obj instanceof Object[]) {
                for (Object element : (Object[]) obj) {
                    toReturn += element + ", ";
                }
            } else {
                toReturn += (String) obj;
            }
        }
        return toReturn;
    }
}