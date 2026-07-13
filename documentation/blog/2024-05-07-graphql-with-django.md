---
title: How to Create a GraphQL API with Python and Django
description: We will discuss how to create a GraphQL API with Python.
slug: graphql-with-python
authors: muhammad_khabbab
category: "Ecosystem / Integrations"
tags: [backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-05-07-graphql-with-django/social.png
hide_table_of_contents: false
---

## Introduction

GraphQL is a query language used to communicate with databases and it is most effective and suitable when you have a complex data structure and the frontend only requires the data they requested. GraphQL utilizes a strongly-typed schema and fixed data structure approach which improves the overall system reliability. For Example, the declarative model of GraphQL API can make your API consistent and predictable, which allows front-end developers to avoid making any change from their end when there is a change from the backend.

GraphQL creates a layer on the backend and specifies the APIs that provide data to the frontend. It is capable of fetching specific data and reducing network usage which ultimately improves the performance of the overall system. For Example, in the micro-services architecture backend, just calling a single GraphQL endpoint can cut down the number of requests from the frontend by processing, combining, filtering, and returning the data from different services.

In this article, we will create GraphQL API for a school management system that will have data relationships for students, teachers, and courses. Let’s suppose that we have enrolled students and assigned teachers to different courses, we will implement GraphQL API for the scenario where we are fetching the course along with the enrolled students and assigned teachers.

## Prerequisites

To get started with GraphQL API, you can choose the backend technology stack of your choice. The most commonly used are Nodejs, Python(Flask), and Python(Django).
**We will be working with:**
**Python –** Download from the Python Website according to your OS and Install it. We are using Windows OS, VS Code IDE, command line terminal, and Python version `3.12.3`.
**Django –** We are using Django as a web framework for clean and pragmatic design to speed up the development process.
**Graphene-Django –** Graphene Django is a library specifically to work with GraphQL in Django Framework.

## Guide on setting up the development environment using Python and Django.

The very first step to working with any technology stack is to create a development environment. The good thing about working with Django is that you don't need a separate web server for it because it has its own.
**Let’s start by creating a virtual environment:**
Open your project directory in IDE and the command line terminal to run the following commands:
`python -m venv smsvenv`

`.\smsvenv\Scripts\activate`

Before running the above commands, make sure that you have installed Python on your OS. These commands will create and activate a virtual environment where you have to install all required dependencies(Django, Graphene-Django, etc.)

**Now install the dependencies by running the commands below:**

`pip install django`

`pip install graphene-django`

Once the above installations are completed, using the Django commands below we will create a folder structure for our GraphQL API project.

`django-admin startproject school_management`

`cd school_management`

`django-admin startapp`

Now, we need to add `graphene-django` and `school` to `INSTALLED_APPS` located in `school_management/settings.py`

<div className="centered-image">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-05-07-graphql-with-django/graphql_1.png" alt="Snapshot of django installed apps" />
</div>
 
*At this stage, our Development environment is set and we are ready to create GraphQL API.*

## Step-by-Step Guide to Creating GraphQL API

### Setting Up the Database

#### Default SQLite setup on Django

In the `school_management/settings.py` file, you can add the configurations for the database. We are using SQLite database configurations that come by default with Django.

<div className="centered-image">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-05-07-graphql-with-django/graphql_2.png" alt="Snapshot of default sqlite configuration in django" />
</div>
 
#### Define Models for Students, Teachers, and Courses in Django.

We will create Models with their relationships in `school/models.py` file for Django’s ORM. We will add three classes i.e., `teacher`, `student`, and `course`. Each will have their column names and types.

```tsx
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

class Teacher(models.Model):
    name = models.CharField(max_length=100)

class Course(models.Model):
    name = models.CharField(max_length=100)
```

#### Describe the relationships: Many-to-many (students and courses), one-to-many (teachers and courses)

**Many-to-Many** – Each student can enroll in multiple courses and each course with have multiple students. We will add this relationship under the course model:

```tsx
class Course(models.Model):
    name = models.CharField(max_length=100)
    students = models.ManyToManyField(Student)
```

**One-to-Many** – Each course will have one teacher but one teacher can teach multiple courses. For this relationship, we will create a teacher foreign key field under the course model.

```tsx
class Course(models.Model):
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student)
```

**The overall schema will look like this:**

<div className="centered-image">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-05-07-graphql-with-django/sms_school_schema.png" alt="Schema Diagram for scenario" />
</div>
 
#### Brief explanation of inserting sample data. 
We will create sample data for student, teacher and course object. There are multiple ways to do it, we will Django admin by following the steps below:

**1. Migrate Models using the commands:**

```tsx
python manage.py makemigrations
python manage.py migrate
```

**2. Create Superuser:**

`python manage.py createsuperuser`

**3. Register Models in school/admin.py:**

```tsx
from django.contrib import admin
from .models import Student, Teacher, Course

admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Course)
```

**4. Run the server using the command:**

`python manage.py runserver`

**5. Access the link on the browser:**

[http://localhost:8000/admin](http://localhost:8000/admin)

**6. Add the data from the admin interface:**

 <div className="centered-image">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-05-07-graphql-with-django/graphql_3.png" alt="Snapshot of django admin interface for adding data" />
</div>
 
## Step-by-Step implementation of GraphQL API
### Instructions on integrating Graphene-Django with Django for GraphQL schema creation.
To create a schema of GeaphQL API, we will create a schema.py file in the `school/` directory where we will have two main sections:

**Types –** Structure of data requested by the client.
**Queries with their resolvers –** Definition of queries to fetch data(read-only) from the database.

After adding the `schema.py` file, the directory structure of our project will look like this:

<div className="centered-image">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-05-07-graphql-with-django/graphql_4.png" alt="Snapshot of directory structure after adding files for graphql schema" />
</div>
 
### Define GraphQL types for Students, Teachers, and Courses using Graphene-Django.
We will create the classes as GraphQL types using `DjangoObjectType` to define each field of the `student`, `teacher`, and `course` class in Django models. To do that, we will implement the following code:

```tsx
# schema.py

import graphene
from graphene_django.types import DjangoObjectType
from .models import Student, Teacher, Course

class StudentType(DjangoObjectType):
    class Meta:
        model = Student

class TeacherType(DjangoObjectType):
    class Meta:
        model = Teacher

class CourseType(DjangoObjectType):
    class Meta:
        model = Course
```

### Creating Queries and Implementation of Resolvers in Django to handle and fetch nested data:

Now we will use the types to fetch the information from the database. For example, if we want to fetch the information of the course assigned to a teacher with all the students that are enrolled in it, we need to define a Query that contains GraphQL lists for each type and their resolvers that are used to fetch and return data for list associated with each type of schema. The entire code in schema.py will be:

```tsx
# schema.py

import graphene
from graphene_django.types import DjangoObjectType
from .models import Student, Teacher, Course

class StudentType(DjangoObjectType):
    class Meta:
        model = Student

class TeacherType(DjangoObjectType):
    class Meta:
        model = Teacher

class CourseType(DjangoObjectType):
    class Meta:
        model = Course

class Query(graphene.ObjectType):
    all_students = graphene.List(StudentType)
    all_teachers = graphene.List(TeacherType)
    all_courses = graphene.List(CourseType)

    def resolve_all_students(self, info):
        return Student.objects.all()

    def resolve_all_teachers(self, info):
        return Teacher.objects.all()

    def resolve_all_courses(self, info):
        return Course.objects.all()

schema = graphene.Schema(query=Query)
```

**Note:** Queries are used just the read-only operations like sorting or filtering. To update data we use mutations.

### Create GraphQL view and add graphql/ URL

In the last step, we will wire up GraphQL with Django by adding a view in `school/views.py` to use the interface to test our queries and mapping the URL with that view in the main `school_management/urls.py` to access it through the browser:

```rsx
# school/views.py
from django.http import JsonResponse
from graphene_django.views import GraphQLView
from .schema import schema

def graphql_view(request):
    view = GraphQLView.as_view(schema=schema, graphiql=True)
    return view(request)
```

```tsx
# school_management/urls.py
from django.contrib import admin
from school.views import graphql_view
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', graphql_view),
]
```

## Testing the API

### Using tools like GraphiQL or Postman for testing GraphQL queries.

In `graphql_view` above, we passed a parameter `graphiql=True` that allows us to use the graphqli interface to test our APIs. This can be accessed by navigating to [http://127.0.0.1:8000/graphql/](https://http://127.0.0.1:8000/graphql/)

<div className="centered-image">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-05-07-graphql-with-django/graphql_5.png" alt="Snapshot of graphqli interface" />
</div>

**The below snapshot of graphqli UI shows our query and its response that fetches the information of courses and their associated teacher and students:**

<div className="centered-image">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-05-07-graphql-with-django/graphql_6.png" alt="Snapshot of making an API call from graphqli interface" />
</div>

## Conclusion

In this article, we have gone through the importance of using Graphql with fundamentals to build a simple Graphql API for handling complex data structures. Using Graphql is most beneficial and effective in situations where API is expected to be integrated across different clients with a specific data structure or only requires specific data with high performance and minimum bandwidth usage. The best way to have a grip on Graphql is to get your hands on it and start implementing it for various scenarios.
