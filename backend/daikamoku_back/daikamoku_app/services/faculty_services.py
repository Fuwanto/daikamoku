from ..models import Faculty, Career, CareerProgress, FacultyCareer


def get_faculties():
    return Faculty.objects.all()


def get_faculty_careers(faculty_id):
    carrers_id = FacultyCareer.objects.filter(faculty__id=faculty_id)
    return Career.objects.filter(id__in=carrers_id)


def get_career_progress(user_id):
    return CareerProgress.objects.filter(user__id=user_id)
