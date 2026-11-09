$(document).ready(function() {

    // Show or hide car details
    $(".show-details").click(function() {
        var target = $(this).attr("data-target");
        $("#" + target).toggle();
    });

    // Show or hide booking form
    $("#continueBtn").click(function() {
        $("#bookingForm").toggle();
    });

    // National ID validation
    $("#bookingForm").submit(function(event) {
        event.preventDefault();

        var id = $("#nationalId").val();

        if (id.length !== 11 || !/^[0-9]+$/.test(id)) {
            alert("National ID must contain 11 digits.");
            return;
        }

        var code = parseInt(id.substring(0, 2), 10);

        if (code < 1 || code > 14) {
            alert("The first two digits must be between 01 and 14.");
            return;
        }
		// Arabic name validation
        var name = $("#customerName").val();

        if (name !== "" && !/^[\u0600-\u06FF\s]+$/.test(name)) {
            alert("Name must contain Arabic letters only.");
            return;
        }
		// Date validation
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();

        if (startDate === "" || endDate === "") {
            alert("Please enter both booking dates.");
            return;
        }

        if (endDate <= startDate) {
            alert("End date must be after start date.");
            return;
        }
		// Phone number validation
        var phone = $("#phone").val();

        if (phone !== "" && !/^09[0-9]{8}$/.test(phone)) {
            alert("Phone number must start with 09 and contain 10 digits.");
            return;
        }
		// Email validation
        var email = $("#email").val();

        if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
		// Check car selection
        if ($("input[name='cars']:checked").length === 0) {
            alert("Please select at least one car.");
            return;
        }

        // Calculate rental cost
        var start = new Date($("#startDate").val());
        var end = new Date($("#endDate").val());

        var days = Math.round((end - start) / (1000 * 60 * 60 * 24));

        var total = 0;
        var result = "Booking Details:\n\n";

        $("input[name='cars']:checked").each(function() {

            var price = Number($(this).attr("data-price"));
            var model = $(this).attr("data-model");

            var cost = price * days;
            var discount = 0;

            if (days > 10) {
                discount = cost * 0.05;
            }

            var finalCost = cost - discount;

            total += finalCost;

            result += "Car: " + model + "\n";
            result += "Days: " + days + "\n";
            result += "Daily Price: " + price + " SYP\n";
            result += "Discount: " + discount + " SYP\n";
            result += "Car Total: " + finalCost + " SYP\n\n";
        });

        result += "Total Amount: " + total + " SYP";

        alert(result);
    });

});