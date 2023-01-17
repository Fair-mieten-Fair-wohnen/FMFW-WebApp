package tasks;

import com.google.inject.AbstractModule;
import play.libs.akka.AkkaGuiceSupport;

public class TasksModule extends AbstractModule implements AkkaGuiceSupport {

    @Override
    protected void configure() {
        bindActor(ArchiverActor.class, "achiver-actor");
        bind(AchiverTask.class).asEagerSingleton();
    }
}
