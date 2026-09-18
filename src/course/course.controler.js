import * as courseService from './course.services.js';
function sanitizeCourseInput(req, res, next) {
    req.body.sanitizedInput = {
        "course_no": req.body.course_no,
        "sched": req.body.sched,
        "professor": req.body.professor,
        "start_date": req.body.start_date ? new Date(req.body.start_date) : undefined,
        "finish_date": req.body.finish_date ? new Date(req.body.finish_date) : undefined,
        "quota": req.body.quota,
        "sport": req.body.sport, // id del Sport al que pertenece
    };
    // Solo dejamos las keys no undefined (soporta PATCH parcial)
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    const input = req.body.sanitizedInput;
    const errores = [];
    if (input.quota !== undefined) {
        if (typeof input.quota !== 'number' || input.cupo <= 0) {
            errores.push("cupo debe ser un número mayor a 0.");
        }
    }
    if (input.start_date !== undefined && isNaN(input.start_date.getTime())) {
        errores.push("fecha_ini debe ser una fecha válida.");
    }
    if (input.finish_date !== undefined && isNaN(input.finish_date.getTime())) {
        errores.push("fecha_fin debe ser una fecha válida.");
    }
    if (input.start_date && input.finish_date && input.start_date > input.finish_date) {
        errores.push("fecha_ini no puede ser posterior a fecha_fin.");
    }
    const stringFields = ['sched', 'professor'];
    stringFields.forEach(field => {
        if (input[field] !== undefined) {
            if (typeof input[field] !== 'string' || input[field].trim() === '') {
                errores.push(`El campo ${field} no puede estar vacío y debe ser texto.`);
            }
        }
    });
    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores de validación", details: errores });
    }
    next();
}
async function findAll(req, res) {
    try {
        const sportId = req.query.sportId ? Number(req.query.sportId) : undefined;
        const courses = await courseService.getAllCourses(sportId);
        res.status(200).json({ message: 'find all courses', data: courses });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number(req.params.id);
        const course = await courseService.getOneCourse(id);
        res.status(200).json({ message: 'find course', data: course });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
;
async function add(req, res) {
    try {
        const course = await courseService.addCourse(req.body.sanitizedInput);
        res.status(201).json({ message: 'course created', data: course });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
;
async function update(req, res) {
    try {
        const id = Number(req.params.id);
        const courseToUpdate = await courseService.updateCourse(id, req.body.sanitizedInput);
        res.status(200).json({ message: 'Course Updated', data: courseToUpdate });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
;
async function remove(req, res) {
    try {
        const id = Number(req.params.id);
        await courseService.removeCourse(id);
        res.status(200).json({ message: 'Course Deleted' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
;
export { sanitizeCourseInput, findAll, findOne, add, remove, update };
//# sourceMappingURL=course.controler.js.map