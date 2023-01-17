package tasks;

import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import com.google.inject.name.Named;
import scala.concurrent.ExecutionContext;
import scala.concurrent.duration.Duration;

import javax.inject.Inject;
import java.util.concurrent.TimeUnit;


public class AchiverTask {

    private final ActorRef archiverActor;
    private final ActorSystem actorSystem;
    private final ExecutionContext executionContext;

    @Inject
    public AchiverTask(
            @Named("achiver-actor") ActorRef archiverActor,
            ActorSystem actorSystem,
            ExecutionContext executionContext) {
        this.archiverActor = archiverActor;
        this.actorSystem = actorSystem;
        this.executionContext = executionContext;

        this.initialize();
    }

    private void initialize() {
        actorSystem
                .scheduler()
                .schedule(
                        Duration.create(30, TimeUnit.SECONDS), // initialDelay
                        Duration.create(60, TimeUnit.SECONDS), // interval
                        archiverActor,
                        "tick", // message,
                        executionContext,
                        ActorRef.noSender());
    }
}
