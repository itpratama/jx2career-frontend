import { ChevronRightIcon } from '@heroicons/react/20/solid';
import image from "../../Assets/img/FIJX2.png";
import Logo from "../../Assets/img/logos.png";
export default function DownloadInstaller() {
    return (
        <div className="relative isolate overflow-hidden bg-black min-h-screen flex flex-col">
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="elegant-pattern"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#elegant-pattern)" />
            </svg>
            <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
                <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#333333] to-[#555555] opacity-30" />
            </div>
            <div className="flex-grow flex flex-col justify-center">
                <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                        <img
                            className="h-16"
                            src={Logo}
                            alt="Your Company"
                        />
                        <div className="mt-16 sm:mt-24 lg:mt-12">
                            <a href="#" className="inline-flex space-x-6">
                                <span className="rounded-full bg-gray-700/10 px-4 py-2 text-sm font-semibold leading-6 text-gray-400 ring-1 ring-inset ring-gray-700/20">
                                    What's new
                                </span>
                            </a>
                        </div>
                        <h1 className="mt-10 text-5xl font-bold tracking-tight text-white sm:text-7xl">
                            FIJX2
                        </h1>
                        <p className="mt-8 text-lg leading-8 text-gray-400">
                            Version 1.0<br></br>
                            Posted by PT.PRATAMA ABADI INDUSTRI JX2 IT<br></br>
                            Click the button below to install and run the application.
                        </p>
                        <div className="mt-12 flex items-center gap-x-6">
                            <a
                                href="/FI-JX2 Setup 1.0.0.exe"
                                className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-indigo-400 hover:to-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                download
                            >
                                Download
                            </a>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <img
                                src={image}
                                alt="App screenshot"
                                width={2432}
                                height={1442}
                                className="w-[80rem] rounded-lg bg-white/5 shadow-2xl ring-1 ring-white/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
