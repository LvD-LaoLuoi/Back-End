document.addEventListener('DOMContentLoaded', function () {
  let courseId;
  const deleteForm = document.forms['delete-course-form'];
  const restoreForm = document.forms['restore-course-form'];
  const btnDeleteCourse = document.getElementById('btn-delete-course');
  const restoredBtn = $('.btn-restore');

  //When dialog confirm clicked
  $('#exampleModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    courseId = button.data('id');
  });

  // When delete course btn clicked
  btnDeleteCourse.onclick = function () {
    deleteForm.action = '/courses/' + courseId + '/destroy?_method=DELETE';
    deleteForm.submit();
  };

  //When restore course btn clicked
  restoredBtn.click(function (e) {
    e.preventDefault();
    const courseId = $(this).data('id');
    restoreForm.action = '/courses/' + courseId + '/restore?_method=PATCH';
    restoreForm.submit();
  });
});
