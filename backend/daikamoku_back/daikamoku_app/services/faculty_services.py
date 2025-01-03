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


def get_carrer_progress_percentage(subjects):
    total_subjects = len(subjects)
    approved_subjects = 0

    for subject in subjects:
        if subject["state_subject"] == "Aprobada":
            approved_subjects += 1

    return "{:.2f}".format((approved_subjects / total_subjects) * 100)


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
                "subject_id": subject.id,
                "subject": subject.name,
                "state_subject": state_description,
                "year": subject.year,
            }
        )

    for p in career_progress.values():
        p["percentage"] = get_carrer_progress_percentage(p["subjects"])

    return list(career_progress.values())


def get_subjects_by_career(career_id):
    subjects_id = CareerSubject.objects.filter(career__id=career_id)
    return Subject.objects.filter(id__in=subjects_id)


def get_state_subjects():
    return StateSubject.objects.all()


def updateStateSubject(subject_id, state_subject_data, user_id, career):
    career_id = Career.objects.get(name=career).id
    state_id = StateSubject.objects.filter(
        description=state_subject_data.capitalize()
    ).first()
    progress = CareerProgress.objects.filter(
        user=user_id, career=career_id, subject=subject_id
    ).first()
    if progress:
        progress.state_subject = state_id
        progress.save()
        return get_percentage_by_career(career_id, user_id)
    return False


def get_percentage_by_career(career_id, user_id):
    subjects = get_subjects_by_career(career_id)
    total_subjects = len(subjects)
    approved_subjects = 0
    for subject in subjects:
        progress = CareerProgress.objects.filter(
            user=user_id, career=career_id, subject=subject.id
        ).first()
        state_progress = StateSubject.objects.get(
            id=progress.state_subject.id
        ).description
        if state_progress == "Aprobada":
            approved_subjects += 1
    return "{:.2f}".format((approved_subjects / total_subjects) * 100)
