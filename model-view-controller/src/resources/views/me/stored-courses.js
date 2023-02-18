document.addEventListener('DOMContentLoaded', function () {
  let courseId;
  const deleteForm = document.forms['delete-course-form'];
  const btnDeleteCourse = document.getElementById('btn-delete-course');

  $('#exampleModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    courseId = button.data('id');
  });

  btnDeleteCourse.onclick = function () {
    deleteForm.action = '/courses/' + courseId + '?_method=DELETE';
    deleteForm.submit();
  };
});
