package response;

public  class Task
{
    private int id;

    private String name;

    private String priority;

    private String date;

    public int getId() {
        return id;
    }

    public synchronized void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public synchronized void setName(String name) {
        this.name = name;
    }

    public String getPriority() {
        return priority;
    }

    public synchronized void setPriority(String priority) {
        this.priority = priority;
    }

    public String getDate() {
        return date;
    }

    public synchronized void setDate(String date) {
        this.date = date;
    }



}
