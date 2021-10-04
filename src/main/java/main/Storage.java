package main;

import response.Task;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class Storage
{
    private static AtomicInteger currentId = new AtomicInteger(0);
    private static ConcurrentHashMap<Integer, Task> tasks = new ConcurrentHashMap <Integer, Task>();

    public static List<Task> getAllTasks()
    {
        ArrayList<Task> tasksList = new ArrayList<Task>();
        tasksList.addAll(tasks.values());
        return tasksList;
    }

    public static int addTask(Task task)
    {
        int taskId = currentId.incrementAndGet();
        task.setId(taskId);
        tasks.put(taskId, task);
        return taskId;
    }

    public static Task getTask(int taskId)
    {
        if(tasks.containsKey(taskId)) {
            return tasks.get(taskId);
        }
        return null;
    }

    public static boolean deleteTask (int taskId) {   // the previous value associated with key, or null if there was no mapping for key

        return tasks.remove(taskId)!= null;

    }

    public static synchronized Task update(int taskId, Task task) {
        if (tasks.containsKey(taskId)) {
            tasks.put(taskId, task);
            return task;
        }
        return null;
    }


}
