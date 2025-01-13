1. encode and decode url 
   1. Why ?
   2. references -  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI , https://www.urlencoder.org/ (used to test using postman)
2. if cors is not enabled in the tester express app , how we are able to hit the api without cors error
3. what are url parameters? what is diff bw query parameter vs prams(req.query vs req.params) ?


4. # Understanding the http request payload
   1. # headers 
         - headers of APIs are meta data that represents the information associated with the apis request and response
      1. it has content-type : this is auto set when we select type of payload in body 
   2. # body

5. Tailwind
   1. in tailwind values like h-12 is predefined utility class it is 3rem - if we want to use aribtary value like any px use  like this h-[12px], squre bracket , also used in calc fn
   2. w-100% or h-100% or w-full of h-full means full (fraction) of the its parent(just parent) element
   3. overflow (x,y,auto)

6. encodeURL and encodeURLComponent(encodes all special characters, including characters like /, :, ?, &, =, and #. that could break str) - they comes with js - used when sending api to backend
7. export type






















# code samples
1. why below code have scroll instead of parent has the h-screen -  when i am inspecting the navbar is not covered in side parent div
   const Main = () => {
  return (
    <div className="h-screen w-screen bg-red-500">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-12 bg-transparent text-white flex items-center px-4">
        Navbar
      </nav>

      {/* Sidebar */}
      <aside className="fixed top-12 left-0 h-[calc(100%-3rem)] w-48 bg-gray-200 text-white p-4">
        Sidebar
      </aside>

      {/* Main Content */}
      <main className="ml-48 mt-12 flex h-[calc(100%-3rem)]">
        {/* Left Scrollable Section */}
        <section className="w-1/2 h-full overflow-auto p-4 bg-gray-100">
          <div className="flex flex-row"></div>
        </section>

        {/* Right Scrollable Section */}
        <section className="w-1/2 h-full overflow-y-auto p-4 bg-gray-200">
          <div className="overflow-x-auto">
            Scrollable Right SectionScrollable Right SectionScrollable Right
            SectionScrollable Right SectionScrollable Right SectionScrollable
            Right SectionScrollable Right Section
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;