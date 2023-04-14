
# Use the latest Rust official image
FROM rust:latest

# Add entry point script
ADD entrypoint.sh /entrypoint.sh

# Set executable permissions
RUN chmod +x /entrypoint.sh

# Set entrypoint
ENTRYPOINT /entrypoint.sh
