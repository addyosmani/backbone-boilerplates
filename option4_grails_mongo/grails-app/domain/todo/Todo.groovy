package todo

class Todo {

    boolean done
    int order
    String text

    static constraints = {
        text(nullable: false, empty: false)
    }
}
