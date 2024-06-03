FROM python:3.8-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

# 필수 종속성 설치
RUN apk add --no-cache --virtual .build-deps \
    build-base \
    gcc \
    musl-dev \
    gfortran \
    libffi-dev \
    openblas-dev \
    && apk add --no-cache \
    libstdc++ \
    openblas

# numpy와 scipy를 먼저 설치합니다.
RUN pip install --no-cache-dir numpy scipy

# requirements.txt에 나머지 종속성 설치
COPY requirements.txt /app/backend/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/backend/

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
