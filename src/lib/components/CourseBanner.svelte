<script>
    let { 
        title = "Course Title",
        instructor = "Instructor",
        description = "A brief description of what you will learn in this course.",
        imageUrl = "",
        courseLink = "#"
    } = $props();
</script>

<a
    href={courseLink}
    class="flex flex-col mb-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out w-full max-w-sm group no-underline overflow-hidden"
>
    <img 
        src={imageUrl}
        alt={title} 
        class="w-full object-cover group-hover:opacity-90 transition-opacity"
    />

    <div class="p-5 flex flex-col flex-1">
        <h3 class="text-lg font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
            {title}
        </h3>

        <p class="text-sm font-medium text-gray-500 mt-1">
            {instructor}
        </p>

        <p class="text-sm text-gray-600 mt-3 line-clamp-3">
            {description}
        </p>

        <div class="mt-5 flex items-center justify-between text-gray-400 group-hover:text-blue-600 transition-colors">
            <span class="text-sm font-semibold">View Course</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </div>

    </div>
</a>