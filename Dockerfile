# Build Stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Install Node.js for the frontend build (required by exec-maven-plugin)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Copy project files
COPY pom.xml .
COPY src ./src
COPY frontend ./frontend

# Build the application (this includes the frontend build via plugins)
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built jar from the build stage
# The wildcard handles version changes in pom.xml automatically
COPY --from=build /app/target/*.jar app.jar

# Expose port (Render sets PORT env var, but this is good documentation)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
