class Web3FormHandler {
    constructor() {
        this.accessKey = "f8389485-23e9-40c8-b840-83954aee8e18"; // Access key stored internally
        this.apiUrl = "https://api.web3forms.com/submit";
    }

    /**
     * Sends a message using the Web3Forms API.
     * @param {string} message - The message content.
     * @returns {Promise} A promise that resolves to the API response.
     */
    async sendMessage(message) {
        const payload = {
            access_key: this.accessKey,
            message: message,
            botcheck: "" // Hidden field to protect against spam
        };

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.status === 200) {
                console.log("Message sent successfully:", result.message);
                return result;
            } else {
                console.error("Error sending message:", result.message);
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("Error:", error.message);
            throw error;
        }
    }
}

