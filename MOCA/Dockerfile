FROM python:latest
# Change work directory
WORKDIR /backend
# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONUTF8 1
ENV PYTHONIOENCODING utf-8
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
# Copy file
COPY ./backend/requirements.txt ./backend/requirements.txt
# Install requirements
RUN pip install --break-system-packages -U pip setuptools && \
    pip install --break-system-packages --no-cache-dir -U -r ./backend/requirements.txt && \
    pip cache purge
RUN rm ./backend/requirements.txt
