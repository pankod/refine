---
title: Django REST Framework - How to use it to create APIs?
description: Explore the Django REST Framework and learn how to create APIs using it.
slug: django-rest-framework
authors: muhammad_khabbab
category: "Ecosystem / Integrations"
tags: [backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-04-03-django-rest/social.png
hide_table_of_contents: false
---

## **Overview and Importance of REST APIs**

REST is a short form of Representational State Transfer, and its APIs allow different applications to communicate with each other through the HTTP protocol. Through REST APIs, we can integrate different applications to exchange data and share functionalities. For Example, on the food delivery app, when we tap on ‘order now’, the mobile app sends a request to API, which processes that request and sends confirmation in response to the mobile app. The most common `HTTP` methods that developers typically use with REST APIs are `GET`, `POST`, `PUT`, and `DELETE`.

Steps to be covered:

- [**Overview and Importance of REST APIs**](#overview-and-importance-of-rest-apis)
- [**What is Django?**](#what-is-django)
- [**Why choose Django REST Framework**](#why-choose-django-rest-framework)
- [**Steps for Installation and Setup of Django REST Framework(DRF)**](#steps-for-installation-and-setup-of-django-rest-frameworkdrf)
  - [**Step 1: Create and Activate Virtual Environment**](#step-1-create-and-activate-virtual-environment)
  - [**Step 2: Install and set pre-requisites**](#step-2-install-and-set-pre-requisites)
  - [**Step 3: Install and Configure DRF**](#step-3-install-and-configure-drf)
- [**How to Create API using DRF?**](#how-to-create-api-using-drf)
  - [**Understanding RESTful Structure**](#understanding-restful-structure)
  - [**Create Model**](#create-model)
  - [**Create Serializer**](#create-serializer)
  - [**Create Views**](#create-views)
  - [**Add URL patterns**](#add-url-patterns)

## **What is Django?**

It is an open-source web framework written in a powerful language, Python, and it is popular among the development community due to its simplicity, flexibility, and rich features. You do not require a separate web server because Django has its own! Due to its pragmatic design, you can speed up the development process and avoid reinventing the wheel. It also comes up with a security `middleware` that helps you to protect your website automatically from the most common security attacks.

## **Why choose Django REST Framework**

The extensive range of pre-built features in the Django REST framework makes common tasks like request handling, authentication, and serialization very simple to utilize. One of the main differences between other frameworks and DRF is that it allows the developers to specify the URL structure rather than depending on one that is automatically created and is less flexible. Serialization is also a fundamental part that supports both ORM and non-ORM data sources. Because of its adaptability and modularity, developers can modify the framework to meet the needs of complex projects, and it reduces code redundancy by adhering to the DRY (_Don't Repeat Yourself_) principle.

## **Steps for Installation and Setup of Django REST Framework(DRF)**

### **Step 1: Create and Activate Virtual Environment**

Before we begin to work with DRF, first, we need to ensure that we have created a virtual environment and it is activated. The activated environment will have all the dependencies installed.

We are using `VS Code` as IDE and using the `command prompt`(Terminal) to execute the commands.

**The project folder is created, and we run the following commands to create and activate the virtual environment.**

```python
python -m venv efvenv
```

By executing the command above, we have created the environment with the name `efvenv`. Now, in the next command, we are going to activate it:

```python
.\efvenv\Scripts\activate
```

Once the virtual environment is activated, you can see it at the start of each line in the command prompt.

**Note:** It is important to understand that activating commands of a virtual environment can be different for different operating systems and command shells. For Linux or MacOS, the command will be `source efvenv/bin/activate`

### **Step 2: Install and set pre-requisites**

Once the virtual environment is activated, the next steps include the installation of Django Framework using the Python package manager. Execute the command below:

```python
pip install django
```

After installation, you can verify it by running the command below, which will return you the version of Django:

```python
python -m django –version
```

In this tutorial, we will be creating an Event Finder App, so let’s create a Django project on the top level that controls the whole web application:

```python
django-admin startproject event_finder
```

For our APIs, we need to create apps inside the project. These apps contain the logic of our APIs, and they can be created by running the command below:

```python
django-admin startapp events
```

### **Step 3: Install and Configure DRF**

In this step, we will first install DRF by using the Python package manager:

```python
pip install djangorestframework
```

In the project directory, go to the `settings.py` file. In our case, it will be located at `/event_finder/settings.py`

Search for `INSTALLED APPS` in `settings.py` and add the `rest_framework` and `events` apps to the list.

```python
INSTALLED_APPS  = [
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
  'rest_framework',
  'events',
  'django_filters',
  'drf_yasg',
]
```

## **How to Create API using DRF?**

### **Understanding RESTful Structure**

The RESTful structure involves different `HTTP` methods that manipulate the resources. As we are creating an event finder App, where the event is a resource. So, we will create endpoints for performing the following actions on the event:

| Endpoint      | Method | Purpose                         |
| :------------ | :----- | :------------------------------ |
| api/events    | GET    | Retrieve the list of all events |
| api/events/id | GET    | Retrieve specific event         |
| api/events/id | POST   | Create an Event                 |
| api/events/id | PUT    | Update an Event                 |
| api/events/id | DELETE | Delete an Event                 |

In order to implement this structure and create our Web APIs, we will implement different parts of our application and take advantage of DRF to streamline this process.

### **Create Model**

First of all, we will define our models in the `model.py` file. This file is created by default in each app when we create it using Django command. For Example, we create a model with name events:

```python
from  django.db  import  models

class  Event(models.Model):

  CATEGORY_CHOICES  = [
    ('CON', 'Concert'),
    ('SPR', 'Sports'),
    ('TEC', 'Technology'),
    ('ART', 'Art'),
  ]

  title  =  models.CharField(max_length=200)
  description  =  models.TextField()
  date  =  models.DateField()
  location  =  models.CharField(max_length=100)
  category  =  models.CharField(max_length=3, choices=CATEGORY_CHOICES, default='CON')
  participant_count  =  models.IntegerField(default=0)
  is_active  =  models.BooleanField(default=True)

  def  __str__(self):

return  self.title
```

Once you have created the model, then you need to make and apply migrations to create the corresponding database schema. So, do not forget to run these commands after creating or updating models:

```python
python manage.py makemigrations

python manage.py migrate
```

<div className="centered-image">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-04-03-django-rest/REST-1.png" alt="Snapshot of making and applying migrations" />
</div>

### **Create Serializer**

Django REST Framework(DRF) provides serializers that can convert complex datatypes like query sets and Django models to Python datatypes that can be rendered into various data formats such as `JSON`, `XML`, and `Yaml`. We will create a serializer for the model we defined above by creating a `serializers.py` file in our Django app i.e., `events`, and name it `EventSerializer`.

```python
from  rest_framework  import  serializers
from .models  import  Event

class  EventSerializer(serializers.ModelSerializer):
  class  Meta:
  model  =  Event
  fields  =  '__all__'
```

### **Create Views**

Using DRF, we can create viewsets, which are the classes that encapsulate common methods(`GET`, `POST`, `PUT`, `DELETE`). If you require standard CRUD operations and reduce the amount of code, then DRF’s viewsets are most feasible. But, if you want to have highly customized views, then it's better to utilize APIView of DRF.

In our `views.py` file, we will create `EventViewSet` by utilizing Event Model and `EventSerializer`

```python
from  rest_framework  import  viewsets
from .models  import  Event
from .serializers  import  EventSerializer

class  EventViewSet(viewsets.ModelViewSet):

  queryset  =  Event.objects.all()
  serializer_class  =  EventSerializer
```

### **Add URL patterns**

Once you set up your views, models, and serializers, then you have to configure your URL routes that will decide the right view to be called for each endpoint. Django REST Framework equips us with a very simple way to handle URL routing.

First, you need to create URL patterns for your app, and for that, create `urls.py` file in your app directory. Import necessary functions and add routing by registering it with the app’s name, like the Example below:

```python
from  django.urls  import  path, include
from  rest_framework.routers  import  DefaultRouter
from .views  import  EventViewSet

router  =  DefaultRouter()
router.register(r'events', EventViewSet)

urlpatterns  = [
  path('', include(router.urls)),
]
```

Add URL patterns to your main project’s `url.py` file and map it with your app `URLConf` by including `[appname].urls`. If you require an organized structure of URLs, then you can make use of `api/` prefix. By considering this practice, our `event_finder` project URL pattern will look like this:

```python
from  django.contrib  import  admin
from  django.urls  import  path, include

urlpatterns  = [
  path('admin/', admin.site.urls),

  path('api/', include('events.urls')),
]
```

As everything is set up, we can now test our fully functional APIs through a built-in interface provided by DRF.

**Run your app through this command:**

```python
python manage.py runserver
```

It will return a localhost URL to open it in the browser by appending `api/` and app name. In our Example, it is:

[http://127.0.0.1:8000/api/events/](http://127.0.0.1:8000/api/events/)

**The interface provided by DRF will look like this:**

<div className="centered-image">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-04-03-django-rest/REST-2.png" alt="Snapshot of Django REST Framework Interface" />
</div>

## **Conclusion**

Whether you are working on a small project or you aim to scale it to a higher level with many complex functionalities, Django, with the addition of Django REST Framework, makes it easier for you to create, test and manage REST APIs through its extensive features. This article has guided you through the basic steps needed to lay the foundation for a basic application that performs common CRUD operations using DRF. We encourage readers to explore it further, as the DRF's role and capabilities extend far beyond.
