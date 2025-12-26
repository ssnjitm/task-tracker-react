export type TaskStatus="pending" | "done";

export type TaskPriority ="low" | "high";

export interface Task{
    id:string,
    title:string;
    description?:string;
    dueDate:string;
    status:TaskStatus;
    priority:TaskPriority;
    createdAt:string;
    updatedAt:string;
    completeAt:string;
}

export type createdTask =Omit<TextTrackList,"id" | "createdAt" | "updatedAt" | "completedAt">;

export type FilterType = "all"|"pending" | "done";

//sort options haru 
export type SortByType="date" | "title" | "priority";
export type SortOrderType="asc"| "desc";

export interface FilterState{
    status:FilterType;

}