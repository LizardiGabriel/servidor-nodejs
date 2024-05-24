var dialog = document.getElementById('confirmDialog');

function showDialog() {
    dialog.showModal(); 
}

function closeDialog() {
    dialog.close(); 
}

function confirmEdit() {
    dialog.close(); 
    document.getElementById('editForm').submit();
}