<header class="py-5 border-b border-gray-100 mb-10">
	<h1 class="text-3xl mb-1">Nurses</h1>
	<p class="text-xs text-gray-400">Well here is kanda short description</p>

	<nav>
		
	</nav>

</header>

<div>
	<form>
		<div class="max-w-md mx-auto">
			<form class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
			  <h2 class="text-2xl font-semibold mb-4">Add Nurse</h2>
			  <div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="nurseID">
					Nurse ID
				  </label>
				  <input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="nurseID"
					type="text"
					placeholder="Enter Nurse ID"
					name=""
				  />
				
				<label class="block text-gray-700 text-sm font-bold mb-2" for="nurseName">
				  Nurse Name
				</label>
				<input
				  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				  id="nurseName"
				  type="text"
				  placeholder="Enter Nurse Name"
				  name="name"
				/>
			  </div>
			  <div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="nurseAge">
				  Nurse Age
				</label>
				<input
				  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				  id="nurseAge"
				  type="number"
				  placeholder="Enter Nurse Age"
				  name="age"
				/>
			  </div>
			  <div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="nurseGender">
				  Nurse Gender
				</label>
				<select
				  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				  id="nurseGender"
				>
				  <option value="male">Male</option>
				  <option value="female">Female</option>
				</select>
			  </div>
			  <div class="flex items-center justify-between">
				<button
				  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				  type="submit"
				>
				  Add Nurse
				</button>
			  </div>
			</form>
		  </div>
	</form>
</div>