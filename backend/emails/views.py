from django.shortcuts import render
import json
from .models import *
from django.http import JsonResponse
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt
from backend.settings import DEFAULT_BACK_EMAIL


@api_view(["POST", "GET"])
def sendMail(request):
    data = request.data
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    # new_email = Email(name=name, email=email, subject=subject, message=message)
    # new_email.save()

    mail_context = render_to_string("mailTemplate.html", {"name": name, "email": email, "subject": subject, "message": message})
    send_mail(subject, message, email, [DEFAULT_BACK_EMAIL], html_message=mail_context)

    return JsonResponse({
        "status" : 'success',
        "message" : 'Mail successfully sent.',
    })
    