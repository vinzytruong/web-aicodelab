# Use an official nginx image as a parent image
FROM nginx:alpine

# Copy the build directory to the nginx html directory
COPY build/ /usr/share/nginx/html

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3060
EXPOSE 3060

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
