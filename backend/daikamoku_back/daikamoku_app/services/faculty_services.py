from ..models import (
    Faculty,
    Career,
    CareerProgress,
    FacultyCareer,
    Subject,
    StateSubject,
    CareerSubject,
)


def get_faculties():
    return Faculty.objects.all()


def get_carrer_by_id(career_id):
    return Career.objects.get(id=career_id)


def get_subject_by_id(subject_id):
    return Subject.objects.get(id=subject_id)


def get_state_subject_by_id(state_subject_id):
    return StateSubject.objects.get(id=state_subject_id)


def get_faculty_careers(faculty_id):
    carrers_id = FacultyCareer.objects.filter(faculty__id=faculty_id)
    return Career.objects.filter(id__in=carrers_id)


def get_career_progress(user_id):
    progress = CareerProgress.objects.filter(user__id=user_id)
    career_progress = {}

    for p in progress:
        career_name = get_carrer_by_id(p.career.id).name
        subject = get_subject_by_id(p.subject.id)
        state_description = get_state_subject_by_id(p.state_subject.id).description

        if career_name not in career_progress:
            career_progress[career_name] = {"career": career_name, "subjects": []}

        career_progress[career_name]["subjects"].append(
            {
                "subject": subject.name,
                "state_subject": state_description,
                "year": subject.year,
            }
        )

    return list(career_progress.values())


def get_subjects_by_career(career_id):
    subjects_id = CareerSubject.objects.filter(career__id=career_id)
    return Subject.objects.filter(id__in=subjects_id)


def get_state_subjects():
    return StateSubject.objects.all()
