# --- Build stage ---
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
# The repo may be checked out on Windows without the exec bit; ensure it's set.
RUN chmod +x ./mvnw && ./mvnw -B -ntp dependency:go-offline
COPY src/ src/
RUN ./mvnw -B -ntp -DskipTests package

# --- Runtime stage ---
FROM eclipse-temurin:17-jre AS runtime
WORKDIR /app
# Non-root user
RUN useradd -r -u 1001 appuser
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
USER appuser
EXPOSE 8080
# Respect the container memory limit (Render free = 512MB). MaxRAMPercentage
# lets the JVM size its heap from the cgroup limit instead of guessing.
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"
# Render injects PORT; the app reads it (server.port=${PORT:8080}).
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
