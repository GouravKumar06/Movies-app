
import { useSelector } from "react-redux";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

const Main = () => {
  const { topMovies } = useSelector((state) => state.movie);
  const { users } = useSelector((state) => state.user);
  const { movies } = useSelector((state) => state.movie);

  const totalCommentsLength = movies?.map((movie) => movie.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div>
      <section className="flex justify-around">
        <div className="ml-[14rem] mt-10">
          <div className="-translate-x-4 flex">
            <SecondaryCard
                pill="Users"
                content={users?.length}
                info="20.2k more then usual"
                gradient="from-teal-500 to-lime-400"
            />
            <SecondaryCard
               pill="Comments"
               content={sumOfCommentsLength}
               info="742.8 more then usual"
               gradient="from-[#CCC514] to-[#CDCB8E]"
            />
            <SecondaryCard
               pill="Movies"
               content={movies?.length}
               info="372+ more then usual"
               gradient="from-green-500 to-lime-400"
            />
          </div>
          <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
            <p>Top Content</p>
            <p>Comments</p>
          </div>

          {topMovies?.map((movie) => (
            <VideoCard
               key={movie._id}
               image={movie.image}
               title={movie.name}
               date={movie.year}
               comments={movie.numReviews}
            />
          ))}
        </div>


      </section>
      
        <div>
          <RealTimeCard />
        </div>
    </div>
  );
};

export default Main;