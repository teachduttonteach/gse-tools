export var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["Paragraph"] = 0] = "Paragraph";
    QuestionType[QuestionType["Multiple Choice"] = 1] = "Multiple Choice";
    QuestionType[QuestionType["Multiple Select"] = 2] = "Multiple Select";
    QuestionType[QuestionType["MC Grid"] = 3] = "MC Grid";
    QuestionType[QuestionType["MS Grid"] = 4] = "MS Grid";
    QuestionType[QuestionType["Short Answer"] = 5] = "Short Answer";
    QuestionType[QuestionType["True / False"] = 6] = "True / False";
})(QuestionType || (QuestionType = {}));
