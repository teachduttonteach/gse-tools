import { CourseWorkResource } from "./CourseWorkResource";
import { CourseMaterial, addCourseMaterials } from "./CourseMaterial";
import { CourseWorkState, CourseWorkType, AssigneeMode } from "./Enums"

export class CourseWorkGS {
    private _courseWorkResource: CourseWorkResource;

    constructor(title: string, topicId: string, description: string = "", maxPoints: number = 100) {
        this._courseWorkResource = {} as CourseWorkResource;
        this._courseWorkResource.title = title;
        this._courseWorkResource.description = description;
        this._courseWorkResource.state = CourseWorkState.PUBLISHED;
        this._courseWorkResource.maxPoints = maxPoints;
        this._courseWorkResource.workType = CourseWorkType.ASSIGNMENT;
        this._courseWorkResource.topicId = topicId;
        this._courseWorkResource.assigneeMode = AssigneeMode.ALL_STUDENTS;
    }

    addMaterials(materials: Array<CourseMaterial>): CourseWorkGS {
        this._courseWorkResource.materials = addCourseMaterials(materials);
        return this;
    }

    setDueDateAndTime(dueDate: Date, dueHour: number, dueMinute: number): CourseWorkGS {
        this._courseWorkResource.dueTime = {
            hours: dueHour, 
            minutes: dueMinute,
            seconds: 0,
            nanos: 0
        };
        this._courseWorkResource.dueDate =  {
            day: dueDate.getDate(),
            month: dueDate.getMonth() + 1,
            year: dueDate.getFullYear()
        }
        return this;
    }

    schedule(time: Date): CourseWorkGS {
        this._courseWorkResource.state = CourseWorkState.DRAFT;
        this._courseWorkResource.scheduledTime = time.getTime().toString();
        return this;
    }

    changeType(type: CourseWorkType, choices?: Array<string>): CourseWorkGS {
        this._courseWorkResource.workType = type;
        if (type == CourseWorkType.MULTIPLE_CHOICE_QUESTION) {
            this._courseWorkResource.multipleChoiceQuestion.choices = choices;
        }
        return this;
    }

    assign(studentIds: Array<string>): CourseWorkGS {
        this._courseWorkResource.assigneeMode = AssigneeMode.INDIVIDUAL_STUDENTS;
        this._courseWorkResource.individualStudentsOptions.studentIds = studentIds;
        return this;
    }

    getResource(): CourseWorkResource {
        return this._courseWorkResource;
    }
}