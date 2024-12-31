 from django.http import HttpResponse

 def home(request):
    return httpResponse("hello ")

def about(request):
    return HttpResponse("hi there")