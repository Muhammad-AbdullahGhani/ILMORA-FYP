# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install build dependencies for ML packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container at /app
COPY requirements.txt ./

# Install any needed packages specified in requirements.txt
# Use CPU-only torch to save space and time with increased timeout
RUN pip install --default-timeout=100 --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu && \
    pip install --default-timeout=100 --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run sentiment_service_python.py when the container launches
CMD ["python", "sentiment_service_python.py"]
